import { logger } from "@/utils/logger"
import { NextResponse, NextRequest } from "next/server"

const url = 'http://localhost:8081/api/v1/comic/manga'

export const dynamic = 'force-dynamic'