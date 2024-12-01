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
  Loader,
  Beer,
  Martini,
  Wine,
  Package,
  Soup,
  MapPinIcon,
  Bookmark,
} from 'lucide-react';
import { PlaceDetails } from '@/types/places';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface UserReview {
  rating: number;
  review: string;
  createdAt: string;
}

interface AttributesProps {
  attributes: PlaceDetails['features']['attributes'];
}

const AttributeBadge = ({ value }: { value: string }) => {
  if (value === 'yes')
    return (
      <Badge variant='default'>
        <Check className='w-3 h-3 mr-1 ' /> Yes
      </Badge>
    );
  if (value === 'no')
    return (
      <Badge variant='secondary'>
        <X className='w-3 h-3 mr-1' /> No
      </Badge>
    );
  return <Badge variant='outline'>{value}</Badge>;
};

const Attributes = ({ attributes }: AttributesProps) => {
  return (
    <Card className='mt-6 p-4 md:p-6'>
      <CardHeader>
        <CardTitle className='text-lg md:text-xl'>Attributes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {Object.entries(attributes).map(([key, value]) => (
            <div
              key={key}
              className='flex items-center justify-between gap-2 md:gap-1'
            >
              <span className='text-sm md:text-base capitalize'>
                {key.replace(/_/g, ' ')}
              </span>
              <AttributeBadge value={value} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Place() {
  const { id } = useParams();

  const [placeData, setPlaceData] = useState<PlaceDetails | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
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

  const toggleLike = () => setIsSaved(!isSaved);
  const toggleMustVisit = () => setIsVisited(!isVisited);

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

  const getPriceRange = (price: number): string => {
    switch (price) {
      case 1:
        return 'Affordable';
      case 2:
        return 'Moderate';
      case 3:
        return 'Expensive';
      case 4:
        return 'Very Expensive';
      default:
        return 'Not specified';
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
      const { latitude, longitude } = placeData.geocodes.main;
      if (latitude && longitude) {
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
          '_blank'
        );
      } else {
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${placeData.name},${placeData.location.formatted_address}`,
          '_blank'
        );
      }
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
        <Loader className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  const imageToUse = placeData?.photos[0]?.prefix
    ? `${placeData.photos[0].prefix}original${placeData.photos[0].suffix}`
    : '/placeholder-place.png';

  return (
    <div className='max-w-4xl mx-auto p-4 space-y-6'>
      <div className='relative h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden'>
        <Image
          src={imageToUse}
          alt={placeData.name}
          layout='fill'
          objectFit='cover'
        />
        <div className='absolute inset-0 bg-black bg-opacity-40 flex items-end'>
          <div className='p-4 text-white'>
            <h1 className='text-xl sm:text-2xl md:text-4xl font-bold'>
              {placeData.name}
            </h1>
            <p className='text-sm md:text-base'>
              {placeData.categories[0].name}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 justify-between items-center'>
        <div className='flex gap-2 w-full sm:w-auto'>
          <Button
            variant={isSaved ? 'default' : 'outline'}
            size='sm'
            onClick={toggleLike}
            className='flex-1 sm:flex-none'
          >
            <Bookmark
              className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`}
            />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button
            variant={isVisited ? 'default' : 'outline'}
            size='sm'
            onClick={toggleMustVisit}
            className='flex-1 sm:flex-none'
          >
            <MapPinIcon
              className={`w-4 h-4 mr-2 ${isVisited ? 'fill-current' : ''}`}
            />
            {isVisited ? 'Visited' : 'Add to Visited List'}
          </Button>
        </div>
        <div className='flex gap-2 mt-2 sm:mt-0'>
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
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center mb-2 sm:mb-0'>
              <MapPin className='w-5 h-5 mr-2 text-gray-500 flex-shrink-0' />
              <p className='text-sm'>{placeData.location.formatted_address}</p>
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={openMap}
              className='w-full sm:w-auto'
            >
              <ExternalLink className='w-4 h-4 mr-2' />
              Open Map
            </Button>
          </div>
          <div className='flex items-center'>
            <Clock className='w-5 h-5 mr-2 text-gray-500 flex-shrink-0' />
            <p className='text-sm'>
              {placeData.hours?.display || 'Hours not available'}
            </p>
          </div>
          {placeData.closed_bucket && (
            <div className='flex items-center mt-2'>
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  placeData.closed_bucket === 'LikelyOpen' ||
                  placeData.closed_bucket === 'VeryLikelyOpen'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              ></div>
              <p className='text-sm'>
                {placeData.closed_bucket.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          )}
          <div className='flex items-center'>
            <Phone className='w-5 h-5 mr-2 text-gray-500 flex-shrink-0' />
            <p className='text-sm'>{placeData.tel || 'Phone not available'}</p>
          </div>
          <div className='flex items-center'>
            <Globe className='w-5 h-5 mr-2 text-gray-500 flex-shrink-0' />
            {placeData.website ? (
              <a
                href={placeData.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm text-blue-500 hover:underline break-all'
              >
                {placeData.website}
              </a>
            ) : (
              <p className='text-sm'>Website not available</p>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <DollarSign className='w-5 h-5 mr-2 text-gray-500' />
              <p className='text-sm'>{getPriceRange(placeData.price || 0)}</p>
            </div>
            <div className='flex items-center'>
              <Star
                className={`w-5 h-5 mr-2 ${getRatingColor(
                  placeData.rating || 0
                )}`}
              />
              <p className='text-sm font-bold'>
                {placeData.rating?.toFixed(1) || 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4 space-y-4'>
          <h2 className='text-lg font-semibold'>Features</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {placeData.features?.payment?.credit_cards
              ?.accepts_credit_cards && (
              <div className='flex items-center'>
                <DollarSign className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Accepts Credit Cards</p>
              </div>
            )}
            {placeData.features?.food_and_drink?.meals?.brunch && (
              <div className='flex items-center'>
                <Soup className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Brunch</p>
              </div>
            )}
            {placeData.features?.food_and_drink?.meals?.happy_hour && (
              <div className='flex items-center'>
                <Wine className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Happy Hour</p>
              </div>
            )}
            {placeData.features?.food_and_drink?.alcohol?.cocktails && (
              <div className='flex items-center'>
                <Martini className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Cocktails</p>
              </div>
            )}
            {placeData.features?.food_and_drink?.alcohol?.full_bar && (
              <div className='flex items-center'>
                <Beer className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Full Bar</p>
              </div>
            )}
            {placeData.features?.services?.dine_in?.reservations && (
              <div className='flex items-center'>
                <Users className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Reservations</p>
              </div>
            )}
            {placeData.features?.services?.delivery && (
              <div className='flex items-center'>
                <Package className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Delivery</p>
              </div>
            )}
            {placeData.features?.amenities?.outdoor_seating && (
              <div className='flex items-center'>
                <Utensils className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Outdoor Seating</p>
              </div>
            )}
            {placeData.features?.amenities?.wifi !== 'n' && (
              <div className='flex items-center'>
                <Wifi className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Wi-Fi Available</p>
              </div>
            )}
            {placeData.features?.amenities?.live_music && (
              <div className='flex items-center'>
                <Music className='w-5 h-5 mr-2 text-gray-500' />
                <p className='text-sm'>Live Music</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {placeData?.features?.attributes && (
        <Attributes attributes={placeData.features.attributes} />
      )}

      {placeData.tastes && placeData.tastes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Tastes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-2'>
              {placeData.tastes.map((taste, index) => (
                <Badge key={index} variant='secondary'>
                  {taste}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Your Review</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {userReview && !isEditing ? (
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= userReview.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className='text-xs text-gray-600'>
                {new Date(userReview.createdAt).toLocaleDateString()}
              </p>
              <p className='text-sm'>{userReview.review}</p>
              <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleEditReview}
                  className='w-full sm:w-auto'
                >
                  <Edit className='w-4 h-4 mr-2' />
                  Edit Review
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full sm:w-auto'
                    >
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
                className='w-full p-2 border rounded-md text-sm'
              />
              <Button onClick={handleReviewSubmit} className='w-full sm:w-auto'>
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
          {placeData.photos ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4'>
              {placeData.photos.length > 0 ? (
                placeData.photos.map((photo) => (
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
                ))
              ) : (
                <p className='text-sm text-gray-600'>No photos available</p>
              )}
            </div>
          ) : (
            <div className='flex justify-center items-center h-32'>
              <Loader className='w-6 h-6 animate-spin text-primary' />
            </div>
          )}
        </TabsContent>
        <TabsContent value='tips' className='mt-4 space-y-4'>
          {placeData.tips?.map((tip, index) => (
            <Card key={index}>
              <CardContent className='p-4'>
                <p className='text-xs text-gray-600 mb-2'>
                  {new Date(tip.created_at).toLocaleDateString()}
                </p>
                <p className='text-sm'>{tip.text}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
