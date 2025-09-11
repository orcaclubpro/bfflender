"use client"

import React, { useState, useEffect } from "react"
import ChatBot from "react-chatbotify"
import BFFLogo from "@/components/layout/BFFLogo"

interface PLChatbotProps {
  isOpen: boolean
  onClose: () => void
}


export default function PLChatbot({ isOpen, onClose }: PLChatbotProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [goal, setGoal] = useState("")
  const [experience, setExperience] = useState("")
  const [volume, setVolume] = useState("")
  const [challenge, setChallenge] = useState("")
  const [uploadStatus, setUploadStatus] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [showUploadArea, setShowUploadArea] = useState(false)
  const [fileUploadTriggered, setFileUploadTriggered] = useState(false)

  // Handle file upload to Payload CMS (original react-chatbotify way)
  const _handleFileUploadOriginal = async (params: { files: File[] }) => {
    const files = params.files
    if (!files || files.length === 0) {
      return "Please select a file to upload."
    }

    const file = files[0]
    setUploadStatus("Creating your challenge...")

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('goal', goal)
      formData.append('experience', experience)
      formData.append('volume', volume)
      formData.append('challenge', challenge)

      const response = await fetch('/api/chatbot-upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadStatus(`✅ Challenge created successfully!`)
        
        // Redirect to owner verification after a brief delay
        setTimeout(() => {
          window.location.href = result.redirectUrl || '/owner'
        }, 3000)
        
        return `Perfect! I've created your BFFLender challenge with your ${result.filename}. 
        
🎯 **Next Step:** Complete your verification at the owner dashboard to unlock your personalized P&L analysis.

You'll be automatically redirected in a few seconds, or you can visit /owner directly.

Thank you for taking the BFFLender challenge!`
      } else {
        setUploadStatus(`❌ ${result.error || 'Upload failed'}`)
        return `I'm sorry, there was an issue creating your challenge: ${result.error || 'Unknown error'}. Please try again or contact our team directly.`
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus("❌ Network error")
      return "I'm sorry, there was a network error creating your challenge. Please check your connection and try again."
    }
  }

  // Handle file upload to Payload CMS (custom drag-drop way)
  const handleFileUpload = async (file: File, retryCount = 0) => {
    const MAX_RETRIES = 2
    
    // Validate file before upload
    if (!file) {
      setUploadStatus("❌ No file selected")
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus("❌ File too large (max 10MB)")
      return
    }

    // Validate required user data
    if (!name || !email) {
      setUploadStatus("❌ Missing required information - Please restart the chat")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setUploadStatus("❌ Invalid email format - Please restart the chat")
      return
    }

    setIsUploading(true)
    setUploadStatus("Creating your challenge...")

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', name.trim())
      formData.append('email', email.toLowerCase().trim())
      formData.append('goal', goal || 'Not specified')
      formData.append('experience', experience || 'Not specified')
      formData.append('volume', volume || 'Not specified')
      formData.append('challenge', challenge || 'Not specified')

      const response = await fetch('/api/chatbot-upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        setUploadStatus(`✅ Challenge created successfully!`)
        
        // Show success message briefly, then redirect to owner verification
        setTimeout(() => {
          setShowUploadArea(false)
          setUploadStatus("🔄 Redirecting to complete verification...")
          
          // Redirect to owner verification page after brief delay
          setTimeout(() => {
            window.location.href = result.redirectUrl || '/owner'
          }, 1500)
        }, 1500)
      } else {
        const errorMessage = result.error || 'Unknown error occurred'
        
        if (retryCount < MAX_RETRIES && !errorMessage.toLowerCase().includes('already exists')) {
          setUploadStatus(`⚠️ Retry ${retryCount + 1}/${MAX_RETRIES}: ${errorMessage}`)
          setTimeout(() => {
            handleFileUpload(file, retryCount + 1)
          }, 2000)
        } else {
          setUploadStatus(`❌ ${errorMessage}`)
          
          if (errorMessage.toLowerCase().includes('already exists')) {
            setTimeout(() => {
              setUploadStatus("🔄 Redirecting to verification...")
              setTimeout(() => {
                window.location.href = '/owner'
              }, 1500)
            }, 2000)
          } else {
            setTimeout(() => {
              setUploadStatus("")
              setShowUploadArea(true)
            }, 4000)
          }
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      
      if (retryCount < MAX_RETRIES) {
        setUploadStatus(`⚠️ Retry ${retryCount + 1}/${MAX_RETRIES}: ${errorMessage}`)
        setTimeout(() => {
          handleFileUpload(file, retryCount + 1)
        }, 2000)
      } else {
        setUploadStatus("❌ Connection failed after multiple attempts. Please check your internet and try again.")
        setTimeout(() => {
          setUploadStatus("")
          setShowUploadArea(true)
        }, 4000)
      }
    } finally {
      if (retryCount === 0 || retryCount === MAX_RETRIES) {
        setTimeout(() => {
          setIsUploading(false)
        }, 1000)
      }
    }
  }

  // Optimized conversation flow - 6 questions + file upload
  const flow = {
    start: {
      message: "Welcome to the BFFLender P&L Challenge! 🎯 I'm here to help you unlock hidden profit in your mortgage business. What's your biggest goal with your mortgage business this year?",
      options: [
        "Increase monthly volume",
        "Improve profit margins", 
        "Reduce operating costs",
        "Scale my team",
        "Find better technology"
      ],
      chatDisabled: false,
      function: (params: { userInput: string }) => setGoal(params.userInput),
      path: "experience"
    },
    
    experience: {
      message: "That's a great goal! Understanding your experience helps me tailor my recommendations. How long have you been in mortgage lending?",
      options: [
        "Less than 2 years",
        "2-5 years",
        "6-10 years", 
        "11-15 years",
        "15+ years"
      ],
      chatDisabled: false,
      function: (params: { userInput: string }) => setExperience(params.userInput),
      path: "name"
    },

    name: {
      message: "Perfect! I'm excited to help you achieve that goal. What's your name?",
      chatDisabled: false,
      function: (params: { userInput: string }) => setName(params.userInput),
      path: "volume"
    },

    volume: {
      message: () => `Nice to meet you, ${name}! To understand your potential, what's your typical monthly loan volume?`,
      options: [
        "$500K - $1M",
        "$1M - $3M", 
        "$3M - $5M",
        "$5M - $10M",
        "$10M+"
      ],
      chatDisabled: false,
      function: (params: { userInput: string }) => setVolume(params.userInput),
      path: "email"
    },

    email: {
      message: () => `Great! With ${volume} monthly volume, there's definitely opportunity to optimize. What's your email address so I can send you the personalized P&L analysis and improvement plan?`,
      chatDisabled: false,
      function: (params: { userInput: string }) => setEmail(params.userInput),
      path: "challenge"
    },

    challenge: {
      message: `Perfect! One last question - what's your biggest operational challenge right now? This helps me prioritize the most impactful recommendations.`,
      options: [
        "Lead generation & marketing",
        "Closing more deals faster", 
        "Reducing operational costs",
        "Scaling team efficiently",
        "Technology & systems",
        "Competition & pricing"
      ],
      chatDisabled: false,
      function: (params: { userInput: string }) => setChallenge(params.userInput),
      path: "file_upload"
    },

    file_upload: {
      message: `Thank you ${name}! Please upload your P&L statement or business overview below to complete your BFFLender challenge.`,
      chatDisabled: true,
      path: "upload_complete"
    },

    upload_complete: {
      message: "🎉 Challenge created successfully! You'll be redirected to complete verification and unlock your personalized P&L analysis.",
      chatDisabled: true,
      options: ["Complete Verification", "Start New Analysis"],
      function: (params: { userInput: string }) => {
        if (params.userInput === "Complete Verification") {
          window.location.href = '/owner'
        }
      },
      path: "start"
    },

    end: {
      message: "🎉 Challenge complete! Check your email for next steps.",
      options: ["Start New Analysis"],
      chatDisabled: true,
      path: "start"
    }
  }

  // Custom styling to match BFFLender branding
  const settings = {
    general: {
      embedded: isOpen,
      primaryColor: "#059669", // emerald-600
      secondaryColor: "#d97706", // amber-600
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    chatHistory: {
      storageKey: "bfflender_pl_challenge"
    },
    chatWindow: {
      showScrollbar: false,
      autoJumpToBottom: true,
      showMessagePrompt: false,
      messagePromptText: "New Messages ↓",
      messagePromptOffset: 30,
    },
    chatInput: {
      disabled: false,
      hideEmojiButton: true,
      hideSendButton: true, // Hide send button completely  
      hideAttachButton: true, // Hide attach button completely
      placeholder: "Click here to upload your P&L document",
      allowNewline: false,
    },
    header: {
      title: (
        <div className="flex items-center space-x-3">
          <BFFLogo 
            size="sm" 
            variant="light" 
            showText={false}
            className="bg-white/20 rounded-lg p-1 backdrop-blur-sm"
          />
          <div>
            <div className="font-bold text-white">P&L Challenge</div>
            <div className="text-xs text-emerald-100">Unlock Your Potential</div>
          </div>
        </div>
      ),
      showAvatar: false,
      closeChatIcon: "❌",
    },
    botBubble: {
      showAvatar: true,
      avatar: "🤖",
      simStream: true,
      streamSpeed: 30,
    },
    userBubble: {
      showAvatar: true, 
      avatar: "👤",
    },
    footer: {
      text: "",
    },
    tooltip: {
      mode: "CLOSE",
      text: "Need help with your P&L? Let's chat! 💬"
    }
  }

  // Custom styles object for advanced styling
  const styles = {
    // Chat window container
    chatWindowStyle: {
      backgroundColor: "#ffffff",
      border: "none",
      borderRadius: "24px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      width: "420px",
      height: "600px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    
    // Header styling 
    headerStyle: {
      background: "linear-gradient(to right, #059669, #047857)",
      borderRadius: "24px 24px 0 0",
      padding: "16px 20px",
      color: "white",
    },

    // Bot message bubbles
    botBubbleStyle: {
      backgroundColor: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "16px 16px 16px 4px",
      color: "#1e293b",
      padding: "12px 16px",
      maxWidth: "85%",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease-out",
    },

    // User message bubbles  
    userBubbleStyle: {
      background: "linear-gradient(to right, #059669, #047857)",
      borderRadius: "16px 16px 4px 16px", 
      color: "white",
      padding: "12px 16px",
      maxWidth: "85%",
      boxShadow: "0 1px 3px rgba(5, 150, 105, 0.3)",
      transition: "all 0.2s ease-out",
    },

    // Input field
    chatInputAreaStyle: {
      borderTop: "1px solid #e2e8f0",
      backgroundColor: "#ffffff",
      padding: showUploadArea ? "0" : "16px 20px",
      borderRadius: "0 0 24px 24px",
      display: showUploadArea ? "none" : "block",
      height: showUploadArea ? "0" : "auto",
    },

    chatInputStyle: {
      border: "2px dashed #059669",
      borderRadius: "12px",
      padding: "20px 16px",
      fontSize: "14px",
      backgroundColor: "#f0fdf4",
      color: "#059669",
      outline: "none",
      transition: "all 0.3s",
      cursor: "pointer",
      textAlign: "center",
      fontWeight: "500",
    },

    // Send button
    sendButtonStyle: {
      background: "linear-gradient(to right, #d97706, #b45309)",
      borderRadius: "12px",
      border: "none",
      padding: "12px 16px",
      color: "white",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
      marginLeft: "8px",
    },

    // Options/suggestions
    optionStyle: {
      backgroundColor: "#ffffff",
      border: "1px solid #059669",
      borderRadius: "20px",
      color: "#059669",
      padding: "8px 16px",
      margin: "4px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },

    optionHoveredStyle: {
      backgroundColor: "#ecfdf5",
      borderColor: "#047857",
      color: "#047857",
      transform: "scale(1.05) translateY(-2px)",
      boxShadow: "0 4px 12px rgba(5, 150, 105, 0.2)",
    },

    // File attachment button - completely hidden
    fileAttachmentButtonStyle: {
      display: "none !important" as const,
      visibility: "hidden" as const,
      width: "0",
      height: "0",
      opacity: 0,
      position: "absolute" as const,
      left: "-9999px",
    },

    // File attachment icon - completely hidden
    fileAttachmentIconStyle: {
      display: "none !important" as const,
      visibility: "hidden" as const,
      width: "0",
      height: "0", 
      opacity: 0,
    },

    // Emoji button - completely hidden  
    emojiButtonStyle: {
      display: "none !important" as const,
      visibility: "hidden" as const, 
      width: "0",
      height: "0",
      opacity: 0,
    },

    // Emoji icon - completely hidden
    emojiIconStyle: {
      display: "none !important" as const,
      visibility: "hidden" as const,
      width: "0", 
      height: "0",
      opacity: 0,
    },

    // Close button
    closeChatButtonStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "none",
      borderRadius: "8px",
      color: "white",
      padding: "8px",
      cursor: "pointer",
      transition: "all 0.2s",
    },
  }

  // Handle close button click
  const handleClose = () => {
    onClose()
  }

  // Trigger upload area when challenge is set (indicating we've reached the file upload step)
  useEffect(() => {
    if (challenge && !fileUploadTriggered) {
      console.log('Challenge set, triggering upload area after delay')
      setTimeout(() => {
        setShowUploadArea(true)
        setFileUploadTriggered(true)
      }, 500) // Short delay to let the message appear first
    }
  }, [challenge, fileUploadTriggered])

  // Reset state when chatbot opens
  useEffect(() => {
    if (isOpen) {
      setName("")
      setEmail("")
      setGoal("")
      setExperience("")
      setVolume("")
      setChallenge("")
      setUploadStatus("")
      setShowUploadArea(false)
      setFileUploadTriggered(false)
    }
  }, [isOpen])

  // Don't render if not open
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="relative animate-in zoom-in duration-300">
        {/* Custom close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 z-50 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-all duration-200 hover:scale-110 hover:rotate-90"
          aria-label="Close chat"
        >
          ✕
        </button>
        
        <div className="relative">
          <ChatBot
            settings={settings}
            styles={styles}
            flow={flow}
          />
          
          {/* Custom File Upload Overlay */}
          {showUploadArea && (
            <div 
              className="absolute bottom-0 left-0 right-0 bg-emerald-50 border-2 border-dashed border-emerald-500 rounded-b-3xl overflow-hidden animate-in slide-in-from-bottom duration-300 cursor-pointer"
              onClick={() => document.getElementById('hidden-file-input')?.click()}
            >
              <div className="p-4 text-center">
                <div className="text-3xl mb-1">{isUploading ? "🏗️" : "📎"}</div>
                <div className="text-emerald-700 font-semibold text-sm">
                  {isUploading ? "Creating Challenge..." : "Click to Upload Document"}
                </div>
                <div className="text-emerald-600 text-xs mt-1">
                  {isUploading ? uploadStatus : "PDF, Excel, Word, Images"}
                </div>
                {isUploading && (
                  <div className="mt-2">
                    <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </div>
                )}
                {!isUploading && (
                  <div className="text-emerald-500 text-xs mt-1">
                    Complete your challenge & unlock your P&L analysis
                  </div>
                )}
              </div>
              <input
                id="hidden-file-input"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleFileUpload(file)
                  }
                }}
                className="hidden"
              />
            </div>
          )}
        </div>
        
        {/* Upload status indicator - only show when not in upload area */}
        {uploadStatus && !showUploadArea && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 text-sm text-center font-medium text-slate-700 shadow-lg animate-pulse">
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  )
}