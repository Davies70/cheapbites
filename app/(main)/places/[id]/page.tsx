'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Loader2,
  AlertCircle,
  BookmarkPlus,
  CheckCircle,
  Pencil,
  Loader,
  Trash2,
  Star,
  Edit,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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
import { PlaceResponse, Place } from '@/types/place';
import { SavedPlace } from '@/types/user';
import ContactCard from '@/components/info-card';

interface UserReview {
  rating: number;
  review: string;
  placeId: string;
  created_at: string;
  name: string;
}

export default function PlacePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const { toast } = useToast();

  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [userReview, setUserReview] = useState<UserReview | undefined>();
  const [isReview, setIsReview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempRating, setTempRating] = useState(0);
  const [tempReview, setTempReview] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isDeletingReview, setIsDeletingReview] = useState(false);

  const reviewRef = useRef<HTMLDivElement>(null);

  // Fetch place + user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/place/${id}`);
        const data: PlaceResponse = await res.json();
        setPlace(data?.placeResponse ?? null);
      } catch {
        toast({
          title: 'Error loading place',
          description: 'Unable to fetch details for this place.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }

      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/user/${session.user.email}`);
          const data = await res.json();

          const review: UserReview | undefined = data.reviews.find(
            (r: UserReview) => r.placeId === id
          );
          if (review) {
            setUserReview(review);
            setIsReview(true); // auto-show review card
          }

          setIsVisited(data.visited.some((p: { id: string }) => p.id === id));
          setIsSaved(data.saved.some((p: { id: string }) => p.id === id));
        } catch (e) {
          console.error('Error fetching user data:', e);
        }
      }
    };

    fetchData();
  }, [id, session?.user?.email, toast]);

  // Scroll review into view when opened
  useEffect(() => {
    if (isReview && reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isReview]);

  // === Actions ===
  const handleShowReview = () => {
    setIsReview(true);
    setIsEditing(false);
    setTempRating(0);
    setTempReview('');
  };

  const handleReviewSubmit = async () => {
    if (tempReview.trim() === '' || tempRating === 0) {
      toast({
        title: 'Incomplete Review',
        description: 'Please provide both a rating and review.',
        variant: 'destructive',
      });
      return;
    }

    if (
      tempReview === userReview?.review &&
      tempRating === userReview?.rating
    ) {
      toast({
        title: 'No Changes',
        description: 'Your review is unchanged.',
      });
      return;
    }

    setIsSubmittingReview(true);

    const newReview: UserReview = {
      rating: tempRating,
      review: tempReview,
      created_at: new Date().toISOString(),
      placeId: id as string,
      name: place?.name || '',
    };

    try {
      const res = await fetch(`/api/user/review/${session?.user?.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (!res.ok) throw new Error('Failed to submit review');

      const userWithNewReview = await res.json();
      const updatedReview: UserReview = userWithNewReview.reviews.find(
        (r: UserReview) => r.placeId === id
      );

      if (updatedReview) {
        setUserReview(updatedReview);
        setIsEditing(false);
        setTempRating(0);
        setTempReview('');
        toast({
          title: 'Review Submitted',
          description: 'Saved successfully.',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to submit review.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleEditReview = () => {
    if (userReview) {
      setTempRating(userReview.rating);
      setTempReview(userReview.review);
      setIsEditing(true);
      setIsReview(true);
    }
  };

  const handleDeleteReview = async () => {
    setIsDeletingReview(true);
    try {
      const res = await fetch(`/api/user/review/${session?.user?.email}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userReview?.placeId),
      });

      if (!res.ok) throw new Error('Failed to delete review');

      setUserReview(undefined);
      setIsReview(false);
      toast({ title: 'Review Deleted', description: 'Deleted successfully.' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to delete review.',
        variant: 'destructive',
      });
    } finally {
      setIsDeletingReview(false);
    }
  };

  // const toggleSave = async () => {
  //   if (!session?.user?.email) {
  //     toast({
  //       title: 'Login Required',
  //       description: 'Please login to save this place.',
  //       variant: 'default',
  //     });
  //     return;
  //   }

  //   // Optimistically update the UI
  //   setIsSaved((prev) => !prev);

  //   try {
  //     const response = await fetch(`/api/user/saved/${session?.user?.email}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         id,
  //         name: place?.name,
  //         category: place?.categories[0].name,
  //         rating: place?.rating,
  //         address: place?.location.formatted_address,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to save place');
  //     }

  //     const data = await response.json();
  //     setIsSaved(data.saved.some((p: SavedPlace) => p.id === id));
  //   } catch (error) {
  //     console.error('Error saving place:', error);
  //     toast({
  //       title: 'Error',
  //       description: 'Failed to save place. Please try again.',
  //       variant: 'destructive',
  //     });
  //     // Revert the optimistic update if there's an error
  //     setIsSaved((prev) => !prev);
  //   }
  // };

  // const toggleMustVisit = async () => {
  //   if (!session?.user?.email) {
  //     toast({
  //       title: 'Login Required',
  //       description: 'Please login to add this place to your visited list.',
  //       variant: 'default',
  //     });
  //     return;
  //   }

  //   // Optimistically update the UI
  //   setIsVisited((prev) => !prev);

  //   try {
  //     const response = await fetch(
  //       `/api/user/visited/${session?.user?.email}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           id,
  //           name: place?.name,
  //           category: place?.categories[0].name,
  //           rating: place?.rating,
  //           address: place?.location.formatted_address,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to update visited list');
  //     }

  //     const data = await response.json();
  //     setIsVisited(data.visited.some((p: SavedPlace) => p.id === id));
  //   } catch (error) {
  //     console.error('Error updating visited list:', error);
  //     toast({
  //       title: 'Error',
  //       description: 'Failed to update visited list. Please try again.',
  //       variant: 'destructive',
  //     });
  //     // Revert the optimistic update if there's an error
  //     setIsVisited((prev) => !prev);
  //   }
  // };

  const toggleSave = async () => {
    if (!session?.user?.email) {
      toast({
        title: 'Login Required',
        description: 'Please login to save this place.',
        variant: 'default',
      });
      return;
    }

    // Optimistically update UI
    setIsSaved((prev) => !prev);
    const newStatus = !isSaved;

    try {
      const response = await fetch(`/api/user/saved/${session?.user?.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name: place?.name,
          category: place?.categories[0].name,
          rating: place?.rating,
          address: place?.location.formatted_address,
        }),
      });

      if (!response.ok) throw new Error('Failed to save place');

      const data = await response.json();
      setIsSaved(data.saved.some((p: SavedPlace) => p.id === id));

      toast({
        title: newStatus ? 'Place Saved' : 'Removed from Saved',
        description: newStatus
          ? `${place?.name} has been saved to your list.`
          : `${place?.name} was removed from your saved places.`,
      });
    } catch (error) {
      console.error('Error saving place:', error);
      toast({
        title: 'Error',
        description: 'Failed to save place. Please try again.',
        variant: 'destructive',
      });
      setIsSaved((prev) => !prev); // revert
    }
  };

  const toggleMustVisit = async () => {
    if (!session?.user?.email) {
      toast({
        title: 'Login Required',
        description: 'Please login to update your visited list.',
        variant: 'default',
      });
      return;
    }

    setIsVisited((prev) => !prev);
    const newStatus = !isVisited;

    try {
      const response = await fetch(
        `/api/user/visited/${session?.user?.email}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id,
            name: place?.name,
            category: place?.categories[0].name,
            rating: place?.rating,
            address: place?.location.formatted_address,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to update visited list');

      const data = await response.json();
      setIsVisited(data.visited.some((p: SavedPlace) => p.id === id));

      toast({
        title: newStatus ? 'Marked as Visited' : 'Removed from Visited',
        description: newStatus
          ? `${place?.name} has been added to your visited list.`
          : `${place?.name} was removed from your visited list.`,
      });
    } catch (error) {
      console.error('Error updating visited list:', error);
      toast({
        title: 'Error',
        description: 'Failed to update visited list. Please try again.',
        variant: 'destructive',
      });
      setIsVisited((prev) => !prev); // revert
    }
  };

  // === Loading / Error states ===
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  if (!place) {
    return (
      <div className='flex justify-center items-center h-screen text-gray-500'>
        <AlertCircle className='w-6 h-6 mr-2' />
        Place not found
      </div>
    );
  }

  const categoryIcon = place?.categories[0]?.icon
    ? `${place.categories[0].icon.prefix}bg_64${place.categories[0].icon.suffix}`
    : '';

  return (
    <div className='max-w-4xl mx-auto p-4 space-y-6'>
      {/* Header */}
      <div className='relative h-56 sm:h-72 md:h-96 rounded-lg overflow-hidden'>
        <Image
          src={'/placeholder-place.png'}
          alt={place?.name}
          fill
          className='object-cover'
          sizes='100vw'
          priority
        />
        <div className='absolute inset-0 bg-black/40 flex items-end'>
          <div className='p-4 text-white'>
            <h1 className='text-2xl md:text-4xl font-bold'>{place?.name}</h1>
            {place.categories.length > 0 && (
              <p className='text-sm md:text-base'>{place.categories[0].name}</p>
            )}
          </div>
        </div>
        {categoryIcon && (
          <div className='absolute right-0 bottom-0 p-2'>
            <Image src={categoryIcon} alt='icon' width={48} height={48} />
          </div>
        )}
      </div>

      <ContactCard place={place} />

      {/* User Actions */}
      <div className='flex flex-wrap gap-3'>
        <Button
          onClick={toggleSave}
          variant='secondary'
          disabled={!session?.user}
          title={!session?.user ? 'Sign in to save' : undefined}
        >
          <BookmarkPlus className='w-4 h-4 mr-2' />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
        <Button
          onClick={toggleMustVisit}
          variant='secondary'
          disabled={!session?.user}
          title={!session?.user ? 'Sign in to mark visited' : undefined}
        >
          <CheckCircle className='w-4 h-4 mr-2' />
          {isVisited ? 'Visited' : 'Mark Visited'}
        </Button>
        {!userReview && !isReview && (
          <Button
            onClick={session?.user ? handleShowReview : undefined}
            disabled={!session?.user}
            title={!session?.user ? 'Sign in to review' : undefined}
          >
            <Pencil className='w-4 h-4 mr-2' />
            Review
          </Button>
        )}
      </div>

      {!session?.user && (
        <div className='text-xs text-gray-500'>Sign in to perform actions.</div>
      )}

      {/* Review Card */}
      {isReview && (
        <Card ref={reviewRef}>
          <CardHeader>
            <CardTitle className='text-lg'>Your Review</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {userReview && !isEditing ? (
              <>
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
                  {new Date(userReview.created_at).toLocaleDateString()}
                </p>
                <p className='text-sm'>{userReview.review}</p>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleEditReview}
                  >
                    <Edit className='w-4 h-4 mr-2' />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        disabled={isDeletingReview}
                      >
                        {isDeletingReview ? (
                          <>
                            <Loader className='w-4 h-4 mr-2 animate-spin' />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className='w-4 h-4 mr-2' />
                            Delete
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
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
              </>
            ) : (
              <>
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
                  placeholder={
                    session
                      ? 'Write your review here...'
                      : 'Sign in to write reviews...'
                  }
                  value={tempReview}
                  onChange={(e) => setTempReview(e.target.value)}
                  rows={4}
                  disabled={!session}
                />
                <Button
                  onClick={handleReviewSubmit}
                  disabled={isSubmittingReview || !session}
                >
                  {isSubmittingReview ? (
                    <>
                      <Loader className='w-4 h-4 mr-2 animate-spin' />
                      {isEditing ? 'Updating...' : 'Submitting...'}
                    </>
                  ) : isEditing ? (
                    'Update Review'
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
