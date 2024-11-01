'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Heart,
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  DollarSign,
  Utensils,
  Users,
  Wifi,
  Music,
  ExternalLink,
  Edit,
  Trash2,
} from 'lucide-react';
import { PlaceDetails } from '@/types/places';
import { useParams } from 'next/navigation';

interface UserReview {
  rating: number;
  review: string;
  createdAt: string;
}

export default function Place() {
  const { id } = useParams();

  const [placeData, setPlaceData] = useState<PlaceDetails | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isMustVisit, setIsMustVisit] = useState(false);
  const [userReview, setUserReview] = useState<UserReview | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempRating, setTempRating] = useState(0);
  const [tempReview, setTempReview] = useState('');

  useEffect(() => {
    fetch(`/api/place/${id}`)
      .then((res) => res.json())
      .then(({ place }) => setPlaceData(place))
      .catch((e) => console.error('Error fetching place data:', e));
  }, [id]);

  const toggleLike = () => setIsLiked(!isLiked);
  const toggleMustVisit = () => setIsMustVisit(!isMustVisit);

  const shareOnSocialMedia = (platform: string) => {
    const url = `https://cheapbites.com/restaurant/${placeData?.fsq_id}`;
    const text = `Check out ${placeData?.name} on CheapBites!`;

    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'instagram':
        navigator.clipboard.writeText(`${text} ${url}`);
        alert('Link copied! You can now paste it on Instagram.');
        break;
    }
  };

  const getRatingColor = (rating: number): string => {
    if (rating >= 9.0) return 'text-green-600';
    if (rating >= 8.0) return 'text-green-500';
    if (rating >= 7.0) return 'text-lime-500';
    if (rating >= 6.0) return 'text-yellow-500';
    if (rating >= 5.0) return 'text-orange-500';
    if (rating >= 4.0) return 'text-orange-600';
    return 'text-red-500';
  };

  const openMap = () => {
    if (placeData?.geocodes?.main) {
      const { latitude, longitude } = placeData.geocodes.roof;
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
        '_blank'
      );
    }
  };

  const handleReviewSubmit = () => {
    if (tempReview.trim() === '' || tempRating === 0) {
      alert('Please provide both a rating and a review before submitting.');
      return;
    }

    const newReview: UserReview = {
      rating: tempRating,
      review: tempReview,
      createdAt: new Date().toISOString(),
    };

    setUserReview(newReview);
    setIsEditing(false);
    setTempRating(0);
    setTempReview('');
  };

  const handleEditReview = () => {
    if (userReview) {
      setTempRating(userReview.rating);
      setTempReview(userReview.review);
      setIsEditing(true);
    }
  };

  const handleDeleteReview = () => {
    setUserReview(null);
  };

  if (!placeData) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-4 space-y-6'>
      <div className='relative h-64 md:h-96 rounded-lg overflow-hidden'>
        <Image
          src={`${placeData.photos[0].prefix}original${placeData.photos[0].suffix}`}
          alt={placeData.name}
          layout='fill'
          objectFit='cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-end'>
          <div className='p-4 text-white'>
            <h1 className='text-2xl md:text-4xl font-bold'>{placeData.name}</h1>
            <p className='text-sm md:text-base'>
              {placeData.categories[0].name}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 justify-between items-center'>
        <div className='flex gap-2'>
          <Button
            variant={isLiked ? 'default' : 'outline'}
            size='sm'
            onClick={toggleLike}
          >
            <Heart
              className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`}
            />
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          <Button
            variant={isMustVisit ? 'default' : 'outline'}
            size='sm'
            onClick={toggleMustVisit}
          >
            <Star
              className={`w-4 h-4 mr-2 ${isMustVisit ? 'fill-current' : ''}`}
            />
            {isMustVisit ? 'Must-Visit' : 'Add to Must-Visit'}
          </Button>
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => shareOnSocialMedia('facebook')}
          >
            <Facebook className='w-4 h-4' />
            <span className='sr-only'>Share on Facebook</span>
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => shareOnSocialMedia('twitter')}
          >
            <Twitter className='w-4 h-4' />
            <span className='sr-only'>Share on Twitter</span>
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => shareOnSocialMedia('instagram')}
          >
            <Instagram className='w-4 h-4' />
            <span className='sr-only'>Share on Instagram</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className='p-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <MapPin className='w-5 h-5 mr-2 text-gray-500' />
              <p>{placeData.location.formatted_address}</p>
            </div>
            <Button variant='outline' size='sm' onClick={openMap}>
              <ExternalLink className='w-4 h-4 mr-2' />
              Open Map
            </Button>
          </div>
          <div className='flex items-center'>
            <Clock className='w-5 h-5 mr-2 text-gray-500' />
            <p>{placeData.hours?.display || 'Hours not available'}</p>
          </div>
          <div className='flex items-center'>
            <Phone className='w-5 h-5 mr-2 text-gray-500' />
            <p>{placeData.tel || 'Phone not available'}</p>
          </div>
          <div className='flex items-center'>
            <Globe className='w-5 h-5 mr-2 text-gray-500' />
            {placeData.website ? (
              <a
                href={placeData.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                {placeData.website}
              </a>
            ) : (
              <p>Website not available</p>
            )}
          </div>
          <div className='flex items-center'>
            <DollarSign className='w-5 h-5 mr-2 text-gray-500' />
            <p>{'$'.repeat(placeData.price || 0)}</p>
          </div>
          <div className='flex items-center'>
            <Star
              className={`w-5 h-5 mr-2 ${getRatingColor(
                placeData.rating || 0
              )}`}
            />
            <p className='font-bold'>{placeData.rating?.toFixed(1) || 'N/A'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4 space-y-4'>
          <h2 className='text-xl font-semibold'>Features</h2>
          <div className='grid grid-cols-2 gap-4'>
            {placeData.features?.payment?.credit_cards
              ?.accepts_credit_cards && (
              <div className='flex items-center'>
                <DollarSign className='w-5 h-5 mr-2 text-gray-500' />
                <p>Accepts Credit Cards</p>
              </div>
            )}
            {placeData.features?.services?.dine_in?.reservations && (
              <div className='flex items-center'>
                <Users className='w-5 h-5 mr-2 text-gray-500' />
                <p>Reservations</p>
              </div>
            )}
            {placeData.features?.amenities?.outdoor_seating && (
              <div className='flex items-center'>
                <Utensils className='w-5 h-5 mr-2 text-gray-500' />
                <p>Outdoor Seating</p>
              </div>
            )}
            {placeData.features?.amenities?.wifi !== 'n' && (
              <div className='flex items-center'>
                <Wifi className='w-5 h-5 mr-2 text-gray-500' />
                <p>Wi-Fi Available</p>
              </div>
            )}
            {placeData.features?.amenities?.live_music && (
              <div className='flex items-center'>
                <Music className='w-5 h-5 mr-2 text-gray-500' />
                <p>Live Music</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Review</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {userReview && !isEditing ? (
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= userReview.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className='text-sm text-gray-600'>
                {new Date(userReview.createdAt).toLocaleDateString()}
              </p>
              <p>{userReview.review}</p>
              <div className='flex space-x-2'>
                <Button variant='outline' size='sm' onClick={handleEditReview}>
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Review
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant='outline' size='sm'>
                      <Trash2 className='w-4 h-4 mr-2' />
                      Delete Review
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your review.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteReview}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='flex items-center space-x-2 mb-4'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= tempRating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setTempRating(star)}
                  />
                ))}
              </div>
              <Textarea
                placeholder='Write your review here...'
                value={tempReview}
                onChange={(e) => setTempReview(e.target.value)}
                rows={4}
                className='w-full p-2 border rounded-md'
              />
              <Button onClick={handleReviewSubmit}>
                {isEditing ? 'Update Review' : 'Submit Review'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue='photos'>
        <TabsList className='w-full justify-start'>
          <TabsTrigger value='photos'>Photos</TabsTrigger>
          <TabsTrigger value='tips'>Tips</TabsTrigger>
        </TabsList>
        <TabsContent value='photos' className='mt-4'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {placeData.photos.map((photo) => (
              <div
                key={photo.id}
                className='aspect-square rounded-lg overflow-hidden'
              >
                <Image
                  src={`${photo.prefix}300x300${photo.suffix}`}
                  alt={placeData.name}
                  width={300}
                  height={300}
                  objectFit='cover'
                />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value='tips' className='mt-4 space-y-4'>
          {placeData.tips?.map((tip, index) => (
            <Card key={index}>
              <CardContent className='p-4'>
                <p className='text-sm text-gray-600 mb-2'>
                  {new Date(tip.created_at).toLocaleDateString()}
                </p>
                <p>{tip.text}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
