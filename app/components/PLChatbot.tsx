"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Send, Bot, User, CheckCircle, Clock, Shield, ArrowLeft, RefreshCw, Lightbulb, AlertCircle, HelpCircle } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"

interface Message {
  id: string
  type: "bot" | "user" | "system"
  content: string
  timestamp: Date
  suggestions?: string[]
  isError?: boolean
  isNew?: boolean
}

interface PLChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export default function PLChatbot({ isOpen, onClose }: PLChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    experience: "",
    monthlyVolume: "",
    avgMargin: "",
    monthlyExpenses: "",
    teamSize: "",
    currentPlatform: "",
    biggestChallenge: "",
  })
  const [isTyping, setIsTyping] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [errorCount, setErrorCount] = useState(0)
  const [conversationHistory, setConversationHistory] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  const chatSteps = [
    {
      question: "Hi! I'm here to help you with the P&L Challenge. Let's start with your name - what's your first name?",
      field: "firstName",
      type: "text",
      placeholder: "Enter your first name",
      helpText: "We use your name to personalize your experience",
      validation: (value: string) => value.length >= 2 ? null : "Please enter at least 2 characters",
      suggestions: ["Need help? Just type 'help' anytime!"]
    },
    {
      question: "Great to meet you, {firstName}! And your last name?",
      field: "lastName",
      type: "text",
      placeholder: "Enter your last name",
      helpText: "This helps us create your personalized analysis",
      validation: (value: string) => value.length >= 2 ? null : "Please enter at least 2 characters"
    },
    {
      question: "Perfect! What's your email address? We'll send your P&L analysis here.",
      field: "email",
      type: "email",
      placeholder: "your.email@company.com",
      helpText: "We'll never share your email with third parties",
      validation: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) ? null : "Please enter a valid email address"
      }
    },
    {
      question: "And your phone number? (Optional - for urgent follow-ups only)",
      field: "phone",
      type: "tel",
      placeholder: "(555) 123-4567",
      helpText: "We only call for time-sensitive opportunities",
      validation: () => null, // Optional field
      suggestions: ["Skip this step", "I prefer email only"]
    },
    {
      question: "What company or brokerage are you currently with?",
      field: "company",
      type: "text",
      placeholder: "Your current company",
      helpText: "This helps us understand your current setup",
      validation: (value: string) => value.length >= 2 ? null : "Please enter your company name"
    },
    {
      question: "How many years of experience do you have in mortgage lending?",
      field: "experience",
      type: "select",
      options: ["0-2 years", "3-5 years", "6-10 years", "11-15 years", "15+ years"],
      helpText: "This helps us tailor our recommendations to your expertise level"
    },
    {
      question: "What's your current monthly loan volume in dollars?",
      field: "monthlyVolume",
      type: "number",
      placeholder: "e.g., 2000000",
      helpText: "Enter your typical monthly volume - we'll keep this confidential",
      validation: (value: string) => {
        const num = parseFloat(value)
        return num > 0 ? null : "Please enter a valid volume amount"
      },
      suggestions: ["$500K - $1M", "$1M - $3M", "$3M - $5M", "$5M+"]
    },
    {
      question: "What's your average margin per loan?",
      field: "avgMargin",
      type: "number",
      placeholder: "e.g., 3500",
      helpText: "Your typical profit per loan helps us calculate potential improvements",
      validation: (value: string) => {
        const num = parseFloat(value)
        return num > 0 ? null : "Please enter a valid margin amount"
      },
      suggestions: ["$1,000 - $2,000", "$2,000 - $4,000", "$4,000 - $6,000", "$6,000+"]
    },
    {
      question: "What are your monthly operating expenses?",
      field: "monthlyExpenses",
      type: "number",
      placeholder: "e.g., 15000",
      helpText: "Include all business costs - rent, staff, marketing, etc.",
      validation: (value: string) => {
        const num = parseFloat(value)
        return num >= 0 ? null : "Please enter a valid expense amount"
      },
      suggestions: ["$5K - $15K", "$15K - $30K", "$30K - $50K", "$50K+"]
    },
    {
      question: "How many people are on your team?",
      field: "teamSize",
      type: "select",
      options: ["Solo (Just me)", "2-3 people", "4-6 people", "7-10 people", "10+ people"],
      helpText: "Team size affects our efficiency recommendations"
    },
    {
      question: "What platform or brokerage are you currently using?",
      field: "currentPlatform",
      type: "text",
      placeholder: "Current platform name",
      helpText: "This helps us understand your current technology stack",
      validation: (value: string) => value.length >= 2 ? null : "Please enter your current platform"
    },
    {
      question: "Finally, what's your biggest business challenge right now?",
      field: "biggestChallenge",
      type: "textarea",
      placeholder: "Describe your main challenge...",
      helpText: "Be specific - this helps us prioritize our recommendations",
      validation: (value: string) => value.length >= 10 ? null : "Please provide more detail (at least 10 characters)",
      suggestions: ["Lead generation", "Closing more deals", "Reducing costs", "Scaling operations", "Technology issues"]
    },
  ]

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  // Initialize conversation with smooth sequencing
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const sequence = [
        { delay: 300, message: "Welcome to the P&L Challenge! 🎯", suggestions: ["Let's get started!", "Tell me more first"] },
        { delay: 1800, message: "I'll guide you through a quick assessment to see how BFFLender can improve your profitability. This will take about 3-4 minutes." },
        { delay: 2800, message: "💡 Pro tip: You can type 'back' to go to the previous question or 'help' for assistance anytime!" },
        { delay: 4200, message: chatSteps[0].question, suggestions: chatSteps[0].suggestions }
      ]

      sequence.forEach(({ delay, message, suggestions }) => {
        const timeout = setTimeout(() => {
          addBotMessage(message, suggestions)
        }, delay)
        timeoutRefs.current.push(timeout)
      })
    }
  }, [isOpen])

  // Smooth scroll with proper timing
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom()
    }, 100)
    timeoutRefs.current.push(timeout)
  }, [messages])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    })
  }, [])

  const addBotMessage = useCallback((content: string, suggestions?: string[]) => {
    setIsTyping(true)
    
    const timeout = setTimeout(() => {
      setMessages((prev) => [
        ...prev.map(msg => ({ ...msg, isNew: false })),
        {
          id: `bot-${Date.now()}`,
          type: "bot",
          content,
          timestamp: new Date(),
          suggestions,
          isNew: true
        },
      ])
      setIsTyping(false)
    }, 800)
    
    timeoutRefs.current.push(timeout)
  }, [])

  const addUserMessage = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev.map(msg => ({ ...msg, isNew: false })),
      {
        id: `user-${Date.now()}`,
        type: "user",
        content,
        timestamp: new Date(),
        isNew: true
      },
    ])
    setConversationHistory(prev => [...prev, content])
  }, [])

  const addSystemMessage = useCallback((content: string, isError = false) => {
    setMessages((prev) => [
      ...prev.map(msg => ({ ...msg, isNew: false })),
      {
        id: `system-${Date.now()}`,
        type: "system",
        content,
        timestamp: new Date(),
        isError,
        isNew: true
      },
    ])
  }, [])

  const handleError = useCallback((errorMessage: string) => {
    setErrorCount(prev => prev + 1)
    addSystemMessage(errorMessage, true)
    
    if (errorCount >= 2) {
      const timeout = setTimeout(() => {
        addBotMessage("I notice you might need some help. Would you like me to explain this question differently?", 
          ["Yes, explain differently", "Skip this question", "Get human help"])
      }, 1000)
      timeoutRefs.current.push(timeout)
    }
  }, [errorCount, addSystemMessage, addBotMessage])

  const handleSpecialCommands = useCallback((value: string): boolean => {
    const lowerValue = value.toLowerCase().trim()
    
    if (lowerValue === 'help') {
      setShowHelp(true)
      addSystemMessage("💡 Help: " + (chatSteps[currentStep].helpText || "Enter your response in the field below."))
      return true
    }
    
    if (lowerValue === 'back' && currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      const prevQuestion = chatSteps[currentStep - 1].question
      const timeout = setTimeout(() => {
        addBotMessage(`Going back: ${prevQuestion}`)
      }, 300)
      timeoutRefs.current.push(timeout)
      return true
    }
    
    if (lowerValue === 'skip' && chatSteps[currentStep].validation === undefined) {
      handleSubmit("")
      return true
    }
    
    return false
  }, [currentStep, addSystemMessage, addBotMessage])

  const validateInput = useCallback((value: string, step: any): string | null => {
    if (step.validation) {
      return step.validation(value)
    }
    return null
  }, [])

  const handleSubmit = useCallback((value: string) => {
    if (!value.trim() && chatSteps[currentStep].validation) {
      handleError("This field is required. Please enter a value.")
      return
    }

    // Handle special commands
    if (handleSpecialCommands(value)) {
      return
    }

    // Validate input
    const currentStepData = chatSteps[currentStep]
    const validationError = validateInput(value, currentStepData)
    
    if (validationError) {
      handleError(validationError)
      return
    }

    addUserMessage(value)

    const currentField = chatSteps[currentStep].field as keyof typeof formData
    setFormData((prev) => ({ ...prev, [currentField]: value }))

    if (currentStep < chatSteps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        const nextQuestion = chatSteps[currentStep + 1].question
        const personalizedQuestion = nextQuestion.replace('{firstName}', formData.firstName)
        addBotMessage(personalizedQuestion, chatSteps[currentStep + 1].suggestions)
      }, 1000)
      timeoutRefs.current.push(timeout)
    } else {
      const completionSequence = [
        { delay: 1000, message: "Perfect! I have all the information I need. 🎉" },
        { 
          delay: 2500, 
          message: `Thanks ${formData.firstName}! Based on your ${formData.monthlyVolume} monthly volume and ${formData.experience} experience, our team will prepare a detailed P&L analysis within 48 hours. If we can't beat your current performance, those Vegas show tickets are on us! 🎰`
        },
        { 
          delay: 4000, 
          message: "You'll receive an email confirmation at " + formData.email + " shortly. Thank you for taking the P&L Challenge!",
          callback: () => {
            setIsCompleted(true)
          }
        }
      ]

      completionSequence.forEach(({ delay, message, callback }) => {
        const timeout = setTimeout(() => {
          addBotMessage(message)
          if (callback) callback()
        }, delay)
        timeoutRefs.current.push(timeout)
      })
    }
  }, [currentStep, formData, handleError, handleSpecialCommands, validateInput, addUserMessage, addBotMessage])

  const handleRestart = useCallback(() => {
    // Clear all timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
    timeoutRefs.current = []
    
    const timeout = setTimeout(() => {
      setMessages([])
      setCurrentStep(0)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        experience: "",
        monthlyVolume: "",
        avgMargin: "",
        monthlyExpenses: "",
        teamSize: "",
        currentPlatform: "",
        biggestChallenge: "",
      })
      setIsCompleted(false)
      setErrorCount(0)
      setConversationHistory([])
      
      // Restart the conversation
      const restartTimeout = setTimeout(() => {
        addBotMessage("Let's start over! What's your first name?", chatSteps[0].suggestions)
      }, 500)
      timeoutRefs.current.push(restartTimeout)
    }, 300)
    
    timeoutRefs.current.push(timeout)
  }, [addBotMessage])

  const getCurrentStep = useCallback(() => chatSteps[currentStep], [currentStep])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-3xl flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">P&L Challenge Assistant</h3>
              <p className="text-blue-100 text-sm">Let's unlock your potential!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isCompleted && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowHelp(!showHelp)}
                className="text-white hover:bg-white/20 p-3 rounded-xl"
                title="Get help"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="text-white hover:bg-white/20 p-3 rounded-xl"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Fixed Help Panel */}
        {showHelp && (
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-200 flex-shrink-0">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Quick Help:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Type "back" to go to the previous question</li>
                  <li>• Type "help" for question-specific guidance</li>
                  <li>• Use the suggestions below for quick answers</li>
                  <li>• All information is kept confidential</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Fixed Progress Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {Math.min(currentStep + 1, chatSteps.length)} of {chatSteps.length}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / chatSteps.length) * 100)}% Complete
              </span>
              {currentStep > 0 && !isCompleted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCurrentStep(prev => prev - 1)
                    const prevQuestion = chatSteps[currentStep - 1].question
                    addBotMessage(`Going back: ${prevQuestion}`)
                  }}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  title="Go back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / chatSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Fixed Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/30">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`${
                    message.type === "user" 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-sm" 
                      : message.type === "system"
                      ? message.isError 
                        ? "bg-red-50 text-red-800 border border-red-200 rounded-2xl px-4 py-3"
                        : "bg-blue-50 text-blue-800 border border-blue-200 rounded-2xl px-4 py-3"
                      : "bg-white text-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.type === "bot" && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {message.type === "user" && (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    {message.type === "system" && (
                      <div className={`w-8 h-8 ${message.isError ? 'bg-red-100' : 'bg-blue-100'} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        {message.isError ? (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        ) : (
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                  </div>
                </div>
                
                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSubmit(suggestion)}
                        className="text-xs px-3 py-1 h-auto bg-white/80 hover:bg-blue-50 border-blue-200 text-blue-700 rounded-full"
                        disabled={isTyping}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-400 px-3">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Input Area - Always Visible */}
        {currentStep < chatSteps.length && !isCompleted && (
          <div className="p-6 border-t border-gray-200 bg-white rounded-b-3xl flex-shrink-0">
            <ChatInput
              step={getCurrentStep()}
              onSubmit={handleSubmit}
              value={formData[getCurrentStep().field as keyof typeof formData]}
              onError={handleError}
              disabled={isTyping}
            />
          </div>
        )}

        {/* Fixed Completion State */}
        {isCompleted && (
          <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-b-3xl flex-shrink-0">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-emerald-800 mb-2">Challenge Submitted!</h4>
              <p className="text-emerald-700 mb-6">
                Our team will analyze your P&L and get back to you within 48 hours.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Clock className="h-4 w-4" />
                  <span>48-hour analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Shield className="h-4 w-4" />
                  <span>100% confidential</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Start New Challenge
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface ChatInputProps {
  step: any
  onSubmit: (value: string) => void
  value: string
  onError: (error: string) => void
  disabled: boolean
}

function ChatInput({ step, onSubmit, value, onError, disabled }: ChatInputProps) {
  const [inputValue, setInputValue] = useState(value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled) return
    
    if (inputValue.trim() || !step.validation) {
      onSubmit(inputValue.trim())
      setInputValue("")
    } else {
      onError("This field is required. Please enter a value.")
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (disabled) return
    
    if (step.type === "number") {
      // Extract number from suggestion if it's a range
      const match = suggestion.match(/\$?([\d,]+)/);
      if (match) {
        const numValue = match[1].replace(/,/g, '');
        setInputValue(numValue);
        return;
      }
    }
    onSubmit(suggestion);
  }

  if (step.type === "select") {
    return (
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-800">Choose an option:</Label>
        {step.helpText && (
          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
            💡 {step.helpText}
          </p>
        )}
        <div className="grid grid-cols-1 gap-3">
          {step.options.map((option: string) => (
            <Button
              key={option}
              variant="outline"
              disabled={disabled}
              className="justify-start text-left h-auto p-4 hover:bg-blue-50 hover:border-blue-300 border-2 border-gray-200 text-gray-700 font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onSubmit(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (step.type === "textarea") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Label className="text-base font-semibold text-gray-800">Your answer:</Label>
        {step.helpText && (
          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
            💡 {step.helpText}
          </p>
        )}
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={step.placeholder}
          className="min-h-[100px] bg-white border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
          autoFocus={!disabled}
        />
        {step.suggestions && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Quick options:</span>
            {step.suggestions.map((suggestion: string, idx: number) => (
              <Button
                key={idx}
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs px-3 py-1 h-auto bg-white hover:bg-blue-50 border-blue-200 text-blue-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
        <Button 
          type="submit" 
          disabled={(!inputValue.trim() && step.validation) || disabled}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed" 
        >
          <Send className="h-5 w-5 mr-2" />
          {disabled ? "Bot is typing..." : "Send Answer"}
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label className="text-base font-semibold text-gray-800">Your answer:</Label>
      {step.helpText && (
        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
          💡 {step.helpText}
        </p>
      )}
      <div className="flex space-x-3">
        <Input
          type={step.type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={step.placeholder}
          className="flex-1 bg-white border-2 border-gray-200 rounded-xl h-12 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
          autoFocus={!disabled}
        />
        <Button 
          type="submit" 
          disabled={(!inputValue.trim() && step.validation) || disabled}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed" 
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      {step.suggestions && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Quick options:</span>
          {step.suggestions.map((suggestion: string, idx: number) => (
            <Button
              key={idx}
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs px-3 py-1 h-auto bg-white hover:bg-blue-50 border-blue-200 text-blue-700 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </form>
  )
}
