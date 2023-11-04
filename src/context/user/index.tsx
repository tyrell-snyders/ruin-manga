'use client'

import { Relationship } from '@/utils/interface';
import { logger } from '@/utils/logger';
import { usePathname, useRouter } from 'next/navigation'
import React, { createContext, useState, useEffect } from 'react'

type UserContextValue = {
    
}

export const UserContext = createContext<UserContextValue | null>(null)