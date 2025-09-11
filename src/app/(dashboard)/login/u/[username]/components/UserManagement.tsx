'use client'

import React, { useState, useEffect, useTransition, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Key
} from 'lucide-react'

// Import server actions
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  resetUserPassword,
  type UserData,
  type UpdateUserData,
} from '../actions/userManagement'
import type { User } from '@/payload-types'

interface UserManagementProps {
  user: User
  currentUser: User
}

type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
}

const UserManagement: React.FC<UserManagementProps> = ({ user: _user, currentUser }) => {
  // State management
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const [isPending, startTransition] = useTransition()

  // Form states
  const [createForm, setCreateForm] = useState<UserData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    roles: 'client'
  })

  const [editForm, setEditForm] = useState<UpdateUserData>({})
  const [passwordResetForm, setPasswordResetForm] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const limit = 10

  // Notification system
  const showNotification = (type: NotificationType, title: string, message: string) => {
    const id = Date.now().toString()
    const notification = { id, type, title, message }
    setNotifications(prev => [...prev, notification])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Load users with useCallback to fix dependency issues
  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getUsers(currentPage, limit, searchTerm, roleFilter === 'all' ? '' : roleFilter)
      
      if (response.success && response.data) {
        const data = response.data as {
          docs: User[]
          totalPages: number
          totalDocs: number
        }
        setUsers(data.docs)
        setTotalPages(data.totalPages)
        setTotalUsers(data.totalDocs)
      } else {
        showNotification('error', 'Error', response.message || 'Failed to load users')
      }
    } catch (error) {
      showNotification('error', 'Error', 'Failed to load users')
      console.error('Load users error:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, limit, searchTerm, roleFilter])

  // Effects
  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  // Search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1)
      } else {
        loadUsers()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, currentPage, loadUsers])

  // Role filter change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    } else {
      loadUsers()
    }
  }, [roleFilter, currentPage, loadUsers])

  // Form handlers
  const handleCreateUser = () => {
    startTransition(async () => {
      try {
        if (createForm.password.length < 6) {
          showNotification('error', 'Validation Error', 'Password must be at least 6 characters long')
          return
        }

        const response = await createUser(createForm)
        
        if (response.success) {
          showNotification('success', 'Success', 'User created successfully')
          setIsCreateModalOpen(false)
          setCreateForm({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            username: '',
            roles: 'client'
          })
          loadUsers()
        } else {
          showNotification('error', 'Error', response.message || 'Failed to create user')
        }
      } catch (error) {
        showNotification('error', 'Error', 'Failed to create user')
        console.error('Create user error:', error)
      }
    })
  }

  const handleEditUser = () => {
    if (!selectedUser) return

    startTransition(async () => {
      try {
        const response = await updateUser(selectedUser.id, editForm)
        
        if (response.success) {
          showNotification('success', 'Success', 'User updated successfully')
          setIsEditModalOpen(false)
          setSelectedUser(null)
          setEditForm({})
          loadUsers()
        } else {
          showNotification('error', 'Error', response.message || 'Failed to update user')
        }
      } catch (error) {
        showNotification('error', 'Error', 'Failed to update user')
        console.error('Update user error:', error)
      }
    })
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return

    startTransition(async () => {
      try {
        const response = await deleteUser(selectedUser.id)
        
        if (response.success) {
          showNotification('success', 'Success', 'User deleted successfully')
          setIsDeleteModalOpen(false)
          setSelectedUser(null)
          loadUsers()
        } else {
          showNotification('error', 'Error', response.message || 'Failed to delete user')
        }
      } catch (error) {
        showNotification('error', 'Error', 'Failed to delete user')
        console.error('Delete user error:', error)
      }
    })
  }

  const handlePasswordReset = () => {
    if (!selectedUser) return

    if (passwordResetForm.newPassword !== passwordResetForm.confirmPassword) {
      showNotification('error', 'Validation Error', 'Passwords do not match')
      return
    }

    if (passwordResetForm.newPassword.length < 6) {
      showNotification('error', 'Validation Error', 'Password must be at least 6 characters long')
      return
    }

    startTransition(async () => {
      try {
        const response = await resetUserPassword(selectedUser.id, passwordResetForm.newPassword)
        
        if (response.success) {
          showNotification('success', 'Success', 'Password reset successfully')
          setIsPasswordResetModalOpen(false)
          setSelectedUser(null)
          setPasswordResetForm({ newPassword: '', confirmPassword: '' })
        } else {
          showNotification('error', 'Error', response.message || 'Failed to reset password')
        }
      } catch (error) {
        showNotification('error', 'Error', 'Failed to reset password')
        console.error('Reset password error:', error)
      }
    })
  }

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase()
  }

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <Badge className="bg-navy-100 text-navy-800 border-navy-200">
        <UserCheck className="w-3 h-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
        <Users className="w-3 h-3 mr-1" />
        Client
      </Badge>
    )
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setEditForm({
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      username: user.username,
      roles: user.roles
    })
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const openPasswordResetModal = (user: User) => {
    setSelectedUser(user)
    setPasswordResetForm({ newPassword: '', confirmPassword: '' })
    setIsPasswordResetModalOpen(true)
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />
      case 'info':
      default:
        return <Clock className="w-5 h-5 text-blue-600" />
    }
  }

  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200 text-emerald-900'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-900'
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-900'
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              'max-w-md p-4 border rounded-xl shadow-lg animate-slide-in-right',
              getNotificationStyles(notification.type)
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getNotificationIcon(notification.type)}
                <div>
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm opacity-90 mt-1">{notification.message}</p>
                </div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and their permissions</CardDescription>
              </div>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 btn-primary"
              disabled={isPending}
            >
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 w-4 h-4" />
              <Input
                placeholder="Search by email, username, or name..."
                className="pl-10 input-professional"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="card-elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Showing {users.length} of {totalUsers} users
              </CardDescription>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || loading}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <span className="text-sm text-navy-600 px-3">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || loading}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-navy-600">Loading users...</span>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-navy-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-navy-900 mb-2">No users found</h3>
              <p className="text-navy-600 mb-6">
                {searchTerm || roleFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first user'
                }
              </p>
              {!searchTerm && roleFilter === 'all' && (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100">
                    <th className="text-left py-3 px-4 font-medium text-navy-700">User</th>
                    <th className="text-left py-3 px-4 font-medium text-navy-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-navy-700">Username</th>
                    <th className="text-left py-3 px-4 font-medium text-navy-700">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-navy-700">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-navy-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-b border-navy-50 hover:bg-blue-50/50 transition-all duration-300"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {getInitials(user.firstName || '', user.lastName || '')}
                          </div>
                          <div>
                            <p className="font-medium text-navy-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-navy-500">
                              {user.id === currentUser.id && '(You)'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-navy-700">{user.email}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-navy-700 font-mono text-sm">@{user.username}</span>
                      </td>
                      <td className="py-4 px-4">
                        {getRoleBadge(user.roles)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-navy-600">{formatDate(user.createdAt)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(user)}
                            disabled={isPending}
                            className="hover:bg-blue-50 hover:border-blue-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openPasswordResetModal(user)}
                            disabled={isPending}
                            className="hover:bg-amber-50 hover:border-amber-300"
                          >
                            <Key className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteModal(user)}
                            disabled={isPending || user.id === currentUser.id}
                            className={cn(
                              "hover:bg-red-50 hover:border-red-300",
                              user.id === currentUser.id && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system. They will receive login credentials via email.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="createFirstName">First Name</Label>
                <Input
                  id="createFirstName"
                  value={createForm.firstName}
                  onChange={(e) => setCreateForm({...createForm, firstName: e.target.value})}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="createLastName">Last Name</Label>
                <Input
                  id="createLastName"
                  value={createForm.lastName}
                  onChange={(e) => setCreateForm({...createForm, lastName: e.target.value})}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="createEmail">Email</Label>
              <Input
                id="createEmail"
                type="email"
                value={createForm.email}
                onChange={(e) => setCreateForm({...createForm, email: e.target.value})}
                placeholder="john.doe@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createUsername">Username</Label>
              <Input
                id="createUsername"
                value={createForm.username}
                onChange={(e) => setCreateForm({...createForm, username: e.target.value})}
                placeholder="johndoe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createPassword">Password</Label>
              <Input
                id="createPassword"
                type="password"
                value={createForm.password}
                onChange={(e) => setCreateForm({...createForm, password: e.target.value})}
                placeholder="Minimum 6 characters"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createRole">Role</Label>
              <Select 
                value={createForm.roles} 
                onValueChange={(value: 'admin' | 'client') => setCreateForm({...createForm, roles: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateUser}
              disabled={isPending || !createForm.email || !createForm.firstName || !createForm.lastName || !createForm.username || !createForm.password}
            >
              {isPending ? 'Creating...' : 'Create User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information. Leave password fields empty to keep current password.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editFirstName">First Name</Label>
                <Input
                  id="editFirstName"
                  value={editForm.firstName || ''}
                  onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLastName">Last Name</Label>
                <Input
                  id="editLastName"
                  value={editForm.lastName || ''}
                  onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={editForm.email || ''}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                placeholder="john.doe@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editUsername">Username</Label>
              <Input
                id="editUsername"
                value={editForm.username || ''}
                onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                placeholder="johndoe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editRole">Role</Label>
              <Select 
                value={editForm.roles || 'client'} 
                onValueChange={(value: 'admin' | 'client') => setEditForm({...editForm, roles: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEditUser}
              disabled={isPending}
            >
              {isPending ? 'Updating...' : 'Update User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-red-900">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Delete User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {getInitials(selectedUser.firstName || '', selectedUser.lastName || '')}
                </div>
                <div>
                  <p className="font-medium text-red-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-sm text-red-700">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Reset Modal */}
      <Dialog open={isPasswordResetModalOpen} onOpenChange={setIsPasswordResetModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Key className="w-5 h-5 text-amber-600" />
              Reset Password
            </DialogTitle>
            <DialogDescription>
              Reset the user's password. They will need to use the new password to log in.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {getInitials(selectedUser.firstName || '', selectedUser.lastName || '')}
                </div>
                <div>
                  <p className="font-medium text-amber-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-sm text-amber-700">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordResetForm.newPassword}
                onChange={(e) => setPasswordResetForm({...passwordResetForm, newPassword: e.target.value})}
                placeholder="Minimum 6 characters"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordResetForm.confirmPassword}
                onChange={(e) => setPasswordResetForm({...passwordResetForm, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsPasswordResetModalOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePasswordReset}
              disabled={isPending || !passwordResetForm.newPassword || !passwordResetForm.confirmPassword}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {isPending ? 'Resetting...' : 'Reset Password'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserManagement