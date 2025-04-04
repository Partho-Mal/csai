import { NextRequest, NextResponse } from "next/server";

export function checkFraud(transaction: { amount: number; location: string; user_id: string }) {
    let score = 0;

    // Rule 1: Large transactions get a higher score
    if (transaction.amount > 5000) score += 30;

    // Rule 2: Transactions from unknown locations
    if (isUnusualLocation(transaction.user_id, transaction.location)) score += 20;

    // Rule 3: Too many transactions from the same user in a short time
    if (isHighFrequency(transaction.user_id)) score += 50;

    return score > 60 ? "High Risk" : "Low Risk";
}

function isUnusualLocation(userId: string, location: string) {
    const knownLocations = ["Mumbai", "Delhi", "Bangalore"];
    return !knownLocations.includes(location);
}

function isHighFrequency(userId: string) {
    return Math.random() > 0.7; // Simulate 30% chance of high frequency
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const riskLevel = checkFraud(data);
        return NextResponse.json({ risk: riskLevel });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
