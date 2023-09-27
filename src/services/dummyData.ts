import { logger } from "@/utils/logger"

function randint(low:number, max?:number) {
  return Math.floor(Math.random() * 10) % (max ?? low) + (max ? low : 0);
}

export async function getTrending() {
    const randomNum = randint(300, 1099)
    try {
        const dummyData = [
            {
                "id": 356,
                "name": "Chain-Saw Man",
                "slug": "chainsaw-man",
                "image": "https://meo.comick.pictures/xgRdMp-m.jpg",
                "type": "manga"
            }, 
            {
                "id": 5798,
                "name": "One Punch Man",
                "slug": "one-punch-man",
                "image": "https://meo.comick.pictures/xgRdMp-m.jpg"  ,
                "type": "manga"             
            }, 
            {
                "id": 3557,
                "name": "The Survival Story Of A Sword King In Another World",
                "slug": "the-survival-story-of-a-king-in-another-world",
                "image": "https://meo.comick.pictures/xgRdMp-m.jpg",
                "type": "manhwa"
            },
            {
                "id": 2439,
                "name": "Damn Reincarnation",
                "slug": "damn-reincarnation",
                "image": "https://meo.comick.pictures/xgRdMp-m.jpg",
                "type": "manhwa"
            },
            {
                "id": 6442,
                "name": "Chronicles of the Demon Faction",
                "slug": "chronicles-of-the-demon-faction",
                "image": "https://meo.comick.pictures/xgRdMp-m.jpg",
                "type": "manhwa"
            },
            {
                "id": 3456,
                "name": "Berserk",
                "slug": "berserk",
                "image": "https://meo.comick.pictures/xgRdMp-m.jpg",
                "type": "manga"
            },
            {
                "id": 9752,
                "name": "Vagabond",
                "slug": "vagabond",
                "image": "https://meo.comick.pictures/xgRdMp-m.jpg",
                "type": "manga"
            },
            {
                "id": 3546,
                "name": "The Steward Demon King",
                "slug": "the-steward-demon-king",
                "image": "https://meo.comick.pictures/xgRdMp-m.jpg",
                "type": "manhwa"
            }
        ]

        return dummyData
    } catch(e) {
        if (e instanceof Error) {
            logger.error(`Error getting trend data: ${e.message}`)
        }
        return e
    }
}