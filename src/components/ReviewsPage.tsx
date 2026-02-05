import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const reviews = [
  {
    id: '1',
    author: 'Marie Dubois',
    rating: 5,
    date: '15 décembre 2024',
    equipment: 'Tente 2 places ultra-légère',
    comment: 'Matériel en excellent état, très léger et facile à monter. Parfait pour mon trek de 5 jours dans les Pyrénées. Service impeccable et équipe très professionnelle.',
    helpful: 12,
  },
  {
    id: '2',
    author: 'Thomas Martin',
    rating: 5,
    date: '10 décembre 2024',
    equipment: 'Sac à dos 70L grand trek',
    comment: 'Super expérience ! Le sac était en parfait état, très confortable même avec une charge lourde. La location a été simple et rapide. Je recommande vivement !',
    helpful: 8,
  },
  {
    id: '3',
    author: 'Sophie Leroux',
    rating: 4,
    date: '5 décembre 2024',
    equipment: 'Chaussures randonnée haute',
    comment: 'Très bon rapport qualité/prix. Les chaussures étaient confortables et parfaitement adaptées. Petit bémol sur la disponibilité des tailles, mais l\'équipe a su trouver une solution.',
    helpful: 15,
  },
  {
    id: '4',
    author: 'Pierre Rousseau',
    rating: 5,
    date: '28 novembre 2024',
    equipment: 'Réchaud à gaz portable',
    comment: 'Matériel de qualité, fonctionne parfaitement. Idéal pour la cuisine en montagne. Location flexible et caution rapidement remboursée.',
    helpful: 6,
  },
  {
    id: '5',
    author: 'Julie Bernard',
    rating: 5,
    date: '20 novembre 2024',
    equipment: 'Lampe frontale LED 500 lumens',
    comment: 'Excellente lampe, très puissante et autonome. Parfaite pour les randonnées nocturnes. Service client au top, merci !',
    helpful: 9,
  },
  {
    id: '6',
    author: 'Lucas Petit',
    rating: 4,
    date: '15 novembre 2024',
    equipment: 'Bâtons de randonnée carbone',
    comment: 'Bâtons légers et résistants. Très utiles pour mon trek. Le système de location est simple et pratique. Seul petit point : j\'aurais aimé plus d\'explications sur les réglages.',
    helpful: 11,
  },
];

const ratingStats = [
  { stars: 5, count: 156, percentage: 75 },
  { stars: 4, count: 38, percentage: 18 },
  { stars: 3, count: 10, percentage: 5 },
  { stars: 2, count: 3, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 },
];

export function ReviewsPage() {
  const totalReviews = ratingStats.reduce((sum, stat) => sum + stat.count, 0);
  const averageRating = (
    ratingStats.reduce((sum, stat) => sum + (stat.stars * stat.count), 0) / totalReviews
  ).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Avis des utilisateurs</h1>
        <p className="text-gray-600">
          Découvrez les expériences de nos clients
        </p>
      </div>

      {/* Rating Summary */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-baseline gap-2 mb-2">
                <span className="text-5xl">{averageRating}</span>
                <span className="text-gray-600">/5</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="w-5 h-5 fill-yellow-400 text-yellow-400" 
                  />
                ))}
              </div>
              <p className="text-gray-600">Basé sur {totalReviews} avis</p>
            </div>

            <div className="space-y-2">
              {ratingStats.map((stat) => (
                <div key={stat.stars} className="flex items-center gap-3">
                  <span className="text-sm w-12">{stat.stars} étoile{stat.stars > 1 ? 's' : ''}</span>
                  <Progress value={stat.percentage} className="flex-1" />
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {stat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-emerald-600 text-white">
                    {review.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span>{review.author}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= review.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    Concernant: <span className="text-gray-900">{review.equipment}</span>
                  </p>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Utile ({review.helpful})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Voir plus d'avis
        </Button>
      </div>
    </div>
  );
}
