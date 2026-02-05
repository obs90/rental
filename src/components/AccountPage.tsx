import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Calendar, History, Settings } from 'lucide-react';

const currentReservations = [
  {
    id: '1',
    equipment: 'Tente 2 places ultra-légère',
    startDate: '28/12/2024',
    endDate: '05/01/2025',
    status: 'En cours',
    total: 120,
    deposit: 150,
  },
  {
    id: '2',
    equipment: 'Sac à dos 40L',
    startDate: '30/12/2024',
    endDate: '05/01/2025',
    status: 'Confirmée',
    total: 72,
    deposit: 80,
  },
];

const pastReservations = [
  {
    id: '3',
    equipment: 'Chaussures randonnée haute',
    startDate: '15/11/2024',
    endDate: '20/11/2024',
    status: 'Terminée',
    total: 50,
    rated: true,
  },
  {
    id: '4',
    equipment: 'Réchaud à gaz portable',
    startDate: '10/10/2024',
    endDate: '15/10/2024',
    status: 'Terminée',
    total: 40,
    rated: true,
  },
  {
    id: '5',
    equipment: 'Lampe frontale LED 500 lumens',
    startDate: '20/09/2024',
    endDate: '25/09/2024',
    status: 'Terminée',
    total: 25,
    rated: false,
  },
  {
    id: '6',
    equipment: 'Bâtons de randonnée carbone',
    startDate: '05/08/2024',
    endDate: '12/08/2024',
    status: 'Terminée',
    total: 42,
    rated: true,
  },
];

const userProfile = {
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  phone: '06 12 34 56 78',
  memberSince: 'Mars 2024',
  totalRentals: 10,
  points: 250,
};

export function AccountPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Mon Compte</h1>
        <p className="text-gray-600">
          Gérez vos réservations et vos informations personnelles
        </p>
      </div>

      {/* Profile Summary */}
      <Card className="mb-8 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl mb-1">{userProfile.name}</h2>
              <p className="text-emerald-100">Membre depuis {userProfile.memberSince}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-emerald-100 text-sm">Total locations</p>
              <p className="text-2xl">{userProfile.totalRentals}</p>
            </div>
            <div>
              <p className="text-emerald-100 text-sm">Points fidélité</p>
              <p className="text-2xl">{userProfile.points}</p>
            </div>
            <div>
              <p className="text-emerald-100 text-sm">Statut</p>
              <Badge className="bg-white text-emerald-600 hover:bg-white">Premium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="reservations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto">
          <TabsTrigger value="reservations" className="gap-2">
            <Calendar className="w-4 h-4" />
            Mes réservations
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="w-4 h-4" />
            Historique
          </TabsTrigger>
        </TabsList>

        {/* Current Reservations */}
        <TabsContent value="reservations" className="space-y-4">
          <h3 className="text-xl mb-4">Réservations en cours</h3>
          {currentReservations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                Aucune réservation en cours
              </CardContent>
            </Card>
          ) : (
            currentReservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-2">{reservation.equipment}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Du {reservation.startDate} au {reservation.endDate}
                      </p>
                    </div>
                    <Badge 
                      className={
                        reservation.status === 'En cours' 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' 
                          : 'bg-green-100 text-green-700 hover:bg-green-100'
                      }
                    >
                      {reservation.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Total location</p>
                      <p className="text-lg">{reservation.total}€</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Caution</p>
                      <p className="text-lg">{reservation.deposit}€</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-4">
          <h3 className="text-xl mb-4">Historique d'emprunts</h3>
          {pastReservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="mb-2">{reservation.equipment}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Du {reservation.startDate} au {reservation.endDate}
                    </p>
                    <p className="text-sm">
                      Total: <span className="text-emerald-600">{reservation.total}€</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 mb-3">
                      {reservation.status}
                    </Badge>
                    {!reservation.rated ? (
                      <Button size="sm" variant="outline">
                        Laisser un avis
                      </Button>
                    ) : (
                      <p className="text-sm text-gray-500">Avis déposé</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Profile Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 block mb-2">Nom complet</label>
              <p>{userProfile.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-2">Email</label>
              <p>{userProfile.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-2">Téléphone</label>
              <p>{userProfile.phone}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-2">Membre depuis</label>
              <p>{userProfile.memberSince}</p>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="outline">Modifier mes informations</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
