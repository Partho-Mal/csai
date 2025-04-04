import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    phoneNumber: {
        type: String,
        // required: [true, "Please provide a phone number"],
        unique: true,
        sparse: true // ✅ This allows multiple null values while enforcing uniqueness for actual numbers
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

    // 🔹 DEVICE HISTORY - Tracks user logins
    deviceHistory: [
        {
            deviceType: String, // "Windows PC", "iPhone", "Android"
            ipAddress: String,  // "192.168.1.10"
            location: String,   // "Mumbai, India"
            lastLogin: { type: Date, default: Date.now }
        }
    ],

    // 🔹 TRANSACTION HISTORY - Tracks payments & fraud risk
    transactionHistory: [
        {
            amount: Number,
            paymentMethod: String,  // "UPI", "Card", "Net Banking"
            status: String,         // "Approved", "Pending", "Blocked"
            timestamp: { type: Date, default: Date.now },
            location: String,
            ipAddress: String,
            fraudScore: Number
        }
    ],

    // 🔹 SECURITY ALERTS - Logs suspicious activities
    securityAlerts: [
        {
            alertType: String,   // "Suspicious Login", "High-Value Transaction", "Unusual Location"
            message: String,     // Alert message
            timestamp: { type: Date, default: Date.now }
        }
    ],

    // 🔹 ACTIVITY LOG - Tracks user actions
    activityLog: [
        {
            activityType: String, // "Login", "Password Change", "Payment Attempt"
            details: String,      // "User logged in from new device"
            timestamp: { type: Date, default: Date.now }
        }
    ],

    // 🔹 RECENT THREATS - Stores flagged security risks
    recentThreats: [
        {
            threatType: String,  // "Brute Force Attack", "Phishing Attempt", "Malware Detected"
            severity: String,    // "Low", "Medium", "High"
            description: String, // "Multiple failed login attempts detected"
            timestamp: { type: Date, default: Date.now }
        }
    ],

    // 🔹 SECURITY OVERVIEW - Summary of security status
    securityOverview: {
        totalThreats: { type: Number, default: 0 },
        highRiskTransactions: { type: Number, default: 0 },
        failedLoginAttempts: { type: Number, default: 0 },
        accountCompromised: { type: Boolean, default: false }
    },

    // 🔹 SECURITY HEALTH - Risk score based on recent activity
    securityHealth: {
        score: { type: Number, default: 100 }, // 0-100 (higher is safer)
        lastUpdated: { type: Date, default: Date.now }
    },

    // 🔹 OTP for High-Value Payments - Extra layer of security
    otpForHighAmount: {
        type: String, // OTP stored temporarily
        default: null
    },

    // 🔹 AUTH TOKENS - Used for password recovery & verification
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
