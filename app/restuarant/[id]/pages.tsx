'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, Star, Clock, Phone, Globe, Facebook, Twitter, Instagram } from 'lucide-react'

const mockRestaurant = {
  fsq_id: "4b9a3c32f964a52047a635e3",
  name: "Block House Kiel",
  categories: [
    {
      id: 13383,
      name: "Steakhouse",
      icon: {
        prefix: "https://ss3.4sqi.net/img/categories_v2/food/steakhouse_",
        suffix: ".png"
      }
    }
  ],
  location: {
    address: "Willestr. 4-6",
    country: "DE",
    formatted_address: "Willestr. 4-6, 24103 Kiel",
    locality: "Kiel",
    postcode: "24103",
    region: "Schleswig-Holstein"
  },
  geocodes: {
    main: {
      latitude: 54.321737,
      longitude: 10.135006
    }
  }
}

const mockPhotos = [
  {
    id: "62ed76a52d25eb0b98bc120d",
    created_at: "2022-08-05T19:59:33.000Z",
    prefix: "https://fastly.4sqi.net/img/general/",
    suffix: "/135351669_1hWayYt8IJqhjJMKTqWW1nCExyujIOcslkJVvEBjAmk.jpg",
    width: 1920,
    height: 1440
  },
  {
    id: "614760dba18be0013d4fbf91",
    created_at: "2021-09-19T16:10:03.000Z",
    prefix: "https://fastly.4sqi.net/img/general/",
    suffix: "/151179283_V6-OqKBJkWjlVSbqu2RVSAMCUJmu4mAKi66vbZPN2xk.jpg",
    width: 3219,
    height: 2124
  },
  {
    id: "5b81d311dab4b1002c803bd0",
    created_at: "2018-08-25T22:07:13.000Z",
    prefix: "https://fastly.4sqi.net/img/general/",
    suffix: "/418328455_f_P_xEgffPacLkNqA0iQ1OT0EglwhhCqTmlrcejDjzo.jpg",
    width: 1440,
    height: 1920
  },
  {
    id: "5b81baa06e4650002cb1cdde",
    created_at: "2018-08-25T20:22:56.000Z",
    prefix: "https://fastly.4sqi.net/img/general/",
    suffix: "/418328455_VZQw5e31aGubvIMtbOTpMDJKSoX_z6DLogGPyvhs1Os.jpg",
    width: 1080,
    height: 1920
  },
  {
    id: "5b674cf7031320002ce39752",
    created_at: "2018-08-05T19:16:07.000Z",
    prefix: "https://fastly.4sqi.net/img/general/",
    suffix: "/137803_54vFTF8-VbnJfp9AiG0gQGcSFR1rQ-1K2qy6c-UYnrU.jpg",
    width: 1920,
    height: 1440
  },
  {
    id: "5b674a80c36588002c3609c2",
    created_at: "2018-08-05T19:05:36.000Z",
    prefix: "https://fastly.4sqi.net/img/general/",
    suffix: "/622981__ieaDSV_kV0jFBfsVmmMsQ_8Mh0hTtIPU33piqbGIHo.jpg",
    width: 1440,
    height: 1440
  }
]

const mockTips = [
  {
    id: "61475d36e861065eb65e7461",
    created_at: "2021-09-19T15:54:30.000Z",
    text: "In September 2021 with strict Corona rules and controls. Well filled, without a reservation it will be difficult to get a table even during the week."
  },
  {
    id: "5509bf10498ecff9fbf0d473",
    created_at: "2015-03-18T18:08:16.000Z",
    text: "Big steaks served by big girls"
  },
  {
    id: "55be8b98498eeeb83b55f9ca",
    created_at: "2015-08-02T21:28:56.000Z",
    text: "Best lamb ever!"
  },
  {
    id: "5064a659e4b011670f43490c",
    created_at: "2012-09-27T19:17:45.000Z",
    text: "Rib Eye in allen Variationen! Grandios!"
  },
  {
    id: "5b538fa4da5ede002cab23f5",
    created_at: "2018-07-21T19:55:16.000Z",
    text: "Nice meat, great beer. Service average though"
  }
]

export default function RestaurantDetails() {
  const [isLiked, setIsLiked] = useState(false)
  const [isMustVisit, setIsMustVisit] = useState(false)

  const toggleLike = () => setIsLiked(!isLiked)
  const toggleMustVisit = () => setIsMustVisit(!isMustVisit)

  const shareOnSocialMedia = (platform: string) => {
    const url = `https://cheapbites.com/restaurant/${mockRestaurant.fsq_id}`
    const text = `Check out ${mockRestaurant.name} on CheapBites!`
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
        break
      case 'instagram':
        navigator.clipboard.writeText(`${text} ${url}`)
        alert('Link copied! You can now paste it on Instagram.')
        break
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
        <Image
          src={`${mockPhotos[0].prefix}original${mockPhotos[0].suffix}`}
          alt={mockRestaurant.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="p-4 text-white">
            <h1 className="text-2xl md:text-4xl font-bold">{mockRestaurant.name}</h1>
            <p className="text-sm md:text-base">{mockRestaurant.categories[0].name}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-2">
          <Button variant={isLiked ? "default" : "outline"} size="sm" onClick={toggleLike}>
            <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          <Button variant={isMustVisit ? "default" : "outline"} size="sm" onClick={toggleMustVisit}>
            <Star className={`w-4 h-4 mr-2 ${isMustVisit ? 'fill-current' : ''}`} />
            {isMustVisit ? 'Must-Visit' : 'Add to Must-Visit'}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => shareOnSocialMedia('facebook')}>
            <Facebook className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => shareOnSocialMedia('twitter')}>
            <Twitter className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => shareOnSocialMedia('instagram')}>
            <Instagram className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-gray-500" />
            <p>{mockRestaurant.location.formatted_address}</p>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            <p>Opening hours not available</p>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-2 text-gray-500" />
            <p>Phone number not available</p>
          </div>
          <div className="flex items-center">
            <Globe className="w-5 h-5 mr-2 text-gray-500" />
            <p>Website not available</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="photos">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="photos" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockPhotos.map((photo) => (
              <div key={photo.id} className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src={`${photo.prefix}300x300${photo.suffix}`}
                  alt={mockRestaurant.name}
                  width={300}
                  height={300}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4 space-y-4">
          {mockTips.map((tip) => (
            <Card key={tip.id}>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-2">
                  {new Date(tip.created_at).toLocaleDateString()}
                </p>
                <p>{tip.text}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}