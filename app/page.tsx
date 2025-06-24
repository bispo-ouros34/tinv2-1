"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Wifi,
  Camera,
  User,
  Heart,
  MapPin,
  MessageCircle,
  Shield,
  AlertTriangle,
  Lock,
  Activity,
  Eye,
  CheckCircle,
  X,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/hooks/useGeolocation"

type AppStep = "landing" |
"form" | "verification" | "preliminary" | "generating" | "result" | "email-capture" |
"offer"

// Updated sales proof messages without specific cities/states
const SalesProofPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState("")

  const salesMessages = [
    "✅ Anna, near you, unlocked a report 3 minutes ago",
    "✅ Charles, recently, viewed conversation history",
    "✅ Amanda just released confidential photos",
    "✅ Luke completed a full analysis right now",
    "✅ Felicity gained access to the confidential report moments ago",
    "✅ John performed a complete verification right 
now",
  ]

  useEffect(() => {
    if (show) {
      const randomMessage = salesMessages[Math.floor(Math.random() * salesMessages.length)]
      setCurrentMessage(randomMessage)
    }
  }, [show])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: -20 }}
      className="fixed bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto 
sm:max-w-xs z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-4"
      style={{
        fontSize: "13px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">{currentMessage}</p>
   
     </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 flex-shrink-0"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export default function SigiloX() {
  const [currentStep, setCurrentStep] = useState<AppStep>("landing")
  const [phoneNumber, setPhoneNumber] = useState("")
  const 
[selectedGender, setSelectedGender] = useState("")
  const [lastTinderUse, setLastTinderUse] = useState("")
  const [cityChange, setCityChange] = useState("")
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string |
null>(null)
  const [isPhotoPrivate, setIsPhotoPrivate] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationMessage, setVerificationMessage] = useState("Starting analysis...")
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatingMessage, setGeneratingMessage] = useState("Analyzing profile photos...")
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 50) // 9:50
  const [showSalesPopup, setShowSalesPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showSalesProof, setShowSalesProof] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Add these new state variables after the existing ones
  const [uploadedPhoto, setUploadedPhoto] = useState<string |
null>(null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [selectedAgeRange, setSelectedAgeRange] = useState("")

  // Email capture states
  const [email, setEmail] = useState("")
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [emailError, setEmailError] = useState("")

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+1",
    name: "United States",
    flag: "🇺🇸",
    placeholder: "(555) 123-4567",
  })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")

  const countries = [
    { code: "+55", name: "Brazil", flag: "🇧🇷", placeholder: 
"(11) 99999-9999" },
    { code: "+1", name: "United States", flag: "🇺🇸", placeholder: "(555) 123-4567" },
    { code: "+1", name: "Canada", flag: "🇨🇦", placeholder: "(555) 123-4567" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧", placeholder: "7911 123456" },
    { code: "+33", name: "France", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
    { code: "+49", name: "Germany", flag: "🇩🇪", placeholder: "1512 3456789" },
    { code: "+39", name: "Italy", flag: "🇮🇹", placeholder: "312 345 6789" },
    { code: "+34", name: 
"Spain", flag: "🇪🇸", placeholder: "612 34 56 78" },
    { code: "+351", name: "Portugal", flag: "🇵🇹", placeholder: "912 345 678" },
    { code: "+52", name: "Mexico", flag: "🇲🇽", placeholder: "55 1234 5678" },
    { code: "+54", name: "Argentina", flag: "🇦🇷", placeholder: "11 1234-5678" },
    { code: "+56", name: "Chile", flag: "🇨🇱", placeholder: "9 1234 5678" },
    { code: "+57", name: "Colombia", flag: "🇨🇴", placeholder: "300 1234567" },
    { code: "+51", name: "Peru", flag: "🇵🇪", placeholder: "912 345 678" },
    
{ code: "+58", name: "Venezuela", flag: "🇻🇪", placeholder: "412-1234567" },
    { code: "+593", name: "Ecuador", flag: "🇪🇨", placeholder: "99 123 4567" },
    { code: "+595", name: "Paraguay", flag: "🇵🇾", placeholder: "961 123456" },
    { code: "+598", name: "Uruguay", flag: "🇺🇾", placeholder: "94 123 456" },
    { code: "+591", name: "Bolivia", flag: "🇧🇴", placeholder: "71234567" },
    { code: "+81", name: "Japan", flag: "🇯🇵", placeholder: "90-1234-5678" },
    { code: "+82", name: "South Korea", flag: "🇰🇷", placeholder: "10-1234-5678" },
    { code: "+86", 
name: "China", flag: "🇨🇳", placeholder: "138 0013 8000" },
    { code: "+91", name: "India", flag: "🇮🇳", placeholder: "81234 56789" },
    { code: "+61", name: "Australia", flag: "🇦🇺", placeholder: "412 345 678" },
    { code: "+64", name: "New Zealand", flag: "🇳🇿", placeholder: "21 123 4567" },
    { code: "+27", name: "South Africa", flag: "🇿🇦", placeholder: "71 123 4567" },
    { code: "+20", name: "Egypt", flag: "🇪🇬", placeholder: "100 123 4567" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬", placeholder: "802 123 4567" },
 
   { code: "+254", name: "Kenya", flag: "🇰🇪", placeholder: "712 123456" },
    { code: "+971", name: "United Arab Emirates", flag: "🇦🇪", placeholder: "50 123 4567" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", placeholder: "50 123 4567" },
    { code: "+90", name: "Turkey", flag: "🇹🇷", placeholder: "501 234 56 78" },
    { code: "+7", name: "Russia", flag: "🇷🇺", placeholder: "912 345-67-89" },
    { code: "+380", name: "Ukraine", flag: "🇺🇦", placeholder: "50 123 4567" },
    { code: "+48", name: "Poland", 
flag: "🇵🇱", placeholder: "512 345 678" },
    { code: "+31", name: "Netherlands", flag: "🇳🇱", placeholder: "6 12345678" },
    { code: "+32", name: "Belgium", flag: "🇧🇪", placeholder: "470 12 34 56" },
    { code: "+41", name: "Switzerland", flag: "🇨🇭", placeholder: "78 123 45 67" },
    { code: "+43", name: "Austria", flag: "🇦🇹", placeholder: "664 123456" },
    { code: "+45", name: "Denmark", flag: "🇩🇰", placeholder: "20 12 34 56" },
    { code: "+46", name: "Sweden", flag: "🇸🇪", placeholder: "70-123 45 67" },
   
 { code: "+47", name: "Norway", flag: "🇳🇴", placeholder: "406 12 345" },
    { code: "+358", name: "Finland", flag: "🇫🇮", placeholder: "50 123 4567" },
  ]

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
country.code.includes(countrySearch),
  )

  // Geolocation hook
  const { city, loading: geoLoading, error: geoError } = useGeolocation()

  // Matrix effect codes
  const matrixCodes = [
    "4bda7c",
    "x1f801",
    "uSr9ub",
    "r31sw",
    "3cqvt",
    "ebwvi",
    "4qd1tu",
    "str5y4",
    "ect2So",
    "xfnpBj",
    "kqjJu",
    "2v46yn",
    "q619ma",
    "wdtqdo",
    "14mkee",
    "pbb3eu",
    "vbncg8",
    "begaSh",
 
   "7rq",
    "dcboeu",
    "keyxs",
    "3Qehu",
    "N8135s",
    "nx794n",
    "11aqSi",
    "zBcpp",
    "s1xcBm",
    "u91xnm",
    "1s7mec",
    "Y8fmf",
    "11masu",
    "ye1f2t",
  ]

  // Progress steps for global progress bar
  const getProgressSteps = () => {
    const steps = [
      {
        id: "form",
      
  label: "Config",
        fullLabel: "Configuration",
        mobileLabel: "Config",
        completed: ["form", "verification", "preliminary", "generating", "result", "email-capture", "offer"].includes(
          currentStep,
        ),
      },
      {
        id: "verification",
        label: "Verif",
        fullLabel: "Verification",
       
 mobileLabel: "Verif",
        completed: ["verification", "preliminary", "generating", "result", "email-capture", "offer"].includes(
          currentStep,
        ),
      },
      {
        id: "preliminary",
        label: "Result",
        fullLabel: "Result",
        mobileLabel: "Result",
        completed: ["preliminary", "generating", "result", "email-capture", "offer"].includes(currentStep),
     
 },
      {
        id: "generating",
        label: "Relat",
        fullLabel: "Report",
        mobileLabel: "Report",
        completed: ["generating", "result", "email-capture", "offer"].includes(currentStep),
      },
      {
        id: "offer",
        label: "Desbl",
        fullLabel: "Unlock",
      
  mobileLabel: "Access",
        completed: currentStep === "offer",
      },
    ]
    return steps
  }

  // Timer countdown
  useEffect(() => {
    if (currentStep === "result" ||
currentStep === "email-capture" || currentStep === "offer") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentStep])

  // Verification progress with dynamic messages
  useEffect(() => {
    if (currentStep === "verification") {
      const messages = [
        { progress: 0, message: "Initializing 
SigiloX AI facial recognition engine..." },
        { progress: 5, message: "Establishing secure connection to Tinder servers..." },
        { progress: 10, message: "Bypassing security protocols and firewalls..." },
        { progress: 15, message: "Extracting biometric facial features from profile..." },
        { progress: 20, message: "Analyzing facial geometry and bone structure..." },
        { progress: 25, message: "Cross-referencing with 247 social media databases..." },
      
  { progress: 30, message: "Scanning Instagram, Facebook, and LinkedIn profiles..." },
        { progress: 35, message: "Analyzing profile photo metadata and EXIF data..." },
        { progress: 40, message: "Decrypting location data from image timestamps..." },
        { progress: 45, message: "Scanning recent login locations and IP addresses..." },
        { progress: 50, message: "Accessing encrypted conversation threads..." },
        { progress: 55, message: "Decrypting private messages and 
chat history..." },
        { progress: 60, message: "Matching facial geometry with 94.7% confidence..." },
        { progress: 65, message: "Verifying identity across multiple platforms..." },
        { progress: 70, message: "Accessing private photo galleries and hidden content..." },
        { progress: 75, message: "Analyzing behavioral patterns and activity logs..." },
        { progress: 80, message: "Compiling comprehensive digital footprint report..." },
        { 
progress: 85, message: "Cross-checking with dating app databases..." },
        { progress: 90, message: "Finalizing security protocols and data encryption..." },
        { progress: 95, message: "Preparing confidential analysis report..." },
        { progress: 100, message: "Analysis complete - Suspicious activity detected!" },
      ]

      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          // Progresso muito 
mais lento: incremento de 0.8% a cada 800ms = ~2 minutos total
          const newProgress = prev + Math.random() * 0.6 + 0.8

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 8)
          if (currentMessage) {
            setVerificationMessage(currentMessage.message)
          }

          if (newProgress >= 
100) {
            setTimeout(() => setCurrentStep("preliminary"), 2000)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 800) // Intervalo aumentado de 350ms para 800ms
      return () => clearInterval(interval)
    }
  }, [currentStep])

  // Generating report progress (30 seconds) with geolocation integration
 
 useEffect(() => {
    if (currentStep === "generating") {
      const baseMessages = [
        { progress: 0, message: "Analyzing profile photos..." },
        { progress: 20, message: "Processing message history..." },
        { progress: 40, message: "Checking last accessed locations..." },
        { progress: 60, message: "Compiling activity data..." },
        { progress: 80, message: "Encrypting sensitive information..." },
    
    { progress: 95, message: "Finalizing complete report..." },
        { progress: 100, message: "Report generated successfully!" },
      ]

      // Add geolocation-specific message if city is available
      const messages = city
        ?
[
            ...baseMessages.slice(0, 2),
            { progress: 30, message: `Analyzing recent activities in the region of ${city}...` },
            ...baseMessages.slice(2),
          ]
        : baseMessages

      const interval = setInterval(() => {
        setGeneratingProgress((prev) => {
          const 
newProgress = prev + 100 / 75

          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 20)
          if (currentMessage) {
            setGeneratingMessage(currentMessage.message)
          }

          if (newProgress >= 100) {
            setTimeout(() => setCurrentStep("result"), 1000)
        
    return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep, city])

  // Updated sales proof effect - now includes generating step
  useEffect(() => {
    if (
      currentStep === "generating" ||
      currentStep === "result" ||
currentStep === "email-capture" ||
      currentStep === "offer"
    ) {
      const showProof = () => {
        if (Math.random() < 0.7) {
          setShowSalesProof(true)
          setTimeout(() => setShowSalesProof(false), 6000)
        }
      }

      const initialTimeout = setTimeout(showProof, 5000)
      const interval = setInterval(showProof, 25000)

      return () => 
{
        clearTimeout(initialTimeout)
        clearInterval(interval)
      }
    }
  }, [currentStep])

  const fetchWhatsAppPhoto = async (phone: string) => {
    if (phone.length < 10) return

    setIsLoadingPhoto(true)
    setPhotoError("")

    try {
      const response = await fetch("/api/whatsapp-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
 
       },
        body: JSON.stringify({ phone: phone }),
      })

      // Check if response is ok first
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType ||
!contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
      }

      const data = await response.json()

      if (data.success) {
        if (data.is_photo_private) {
          setProfilePhoto(
            "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
          )
          setIsPhotoPrivate(true)
        } else 
{
          setProfilePhoto(data.result)
          setIsPhotoPrivate(false)
        }
      } else {
        setProfilePhoto(
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        )
        setIsPhotoPrivate(true)
        setPhotoError("Could not load photo")
      }
    } catch (error) {
      
console.error("Error fetching photo:", error)
      setProfilePhoto(
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      )
      setIsPhotoPrivate(true)
      setPhotoError("Error loading photo")
    } finally {
      setIsLoadingPhoto(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    // Ensure the value starts with the selected country code
    let formattedValue = value
    if (!value.startsWith(selectedCountry.code)) {
      // If user is 
typing a number without country code, prepend it
      if (value && !value.startsWith("+")) {
        formattedValue = selectedCountry.code + " " + value
      } else if (value.startsWith("+") && !value.startsWith(selectedCountry.code)) {
        // User typed a different country code, keep it as is
        formattedValue = value
      } else {
        formattedValue = selectedCountry.code + " " + value.replace(selectedCountry.code, "").trim()
    
  }
    }

    setPhoneNumber(formattedValue)

    // Extract just the numbers for API call
    const cleanPhone = formattedValue.replace(/[^0-9]/g, "")
    if (cleanPhone.length >= 10) {
      fetchWhatsAppPhoto(cleanPhone)
    } else {
