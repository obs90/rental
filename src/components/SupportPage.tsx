import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send
} from 'lucide-react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Téléphone',
    value: '01 23 45 67 89',
    description: 'Lun-Sam: 9h-18h',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@randolocation.fr',
    description: 'Réponse sous 24h',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: '123 Rue de la Montagne',
    description: '75001 Paris, France',
  },
  {
    icon: Clock,
    title: 'Horaires',
    value: 'Lun-Sam: 9h-18h',
    description: 'Fermé dimanche',
  },
];

const faqQuick = [
  {
    question: 'Comment annuler une réservation ?',
    answer: 'Vous pouvez annuler votre réservation jusqu\'à 48h avant la date de retrait depuis votre compte.'
  },
  {
    question: 'Puis-je modifier mes dates de location ?',
    answer: 'Oui, contactez-nous au moins 24h avant pour modifier vos dates, sous réserve de disponibilité.'
  },
  {
    question: 'Quels sont les moyens de paiement acceptés ?',
    answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard) et les virements bancaires.'
  },
];

export function SupportPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Contact Support</h1>
        <p className="text-gray-600">
          Notre équipe est là pour vous aider
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Envoyez-nous un message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input 
                      id="name" 
                      placeholder="Jean Dupont"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="jean.dupont@example.com"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone (optionnel)</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Sujet</Label>
                  <Input 
                    id="subject" 
                    placeholder="Question sur ma réservation"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="Décrivez votre demande en détail..."
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.title}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="mb-1 text-sm text-gray-600">{method.title}</h4>
                      <p className="mb-1 break-words">{method.value}</p>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Questions fréquentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqQuick.map((item, index) => (
              <div key={index} className="pb-4 border-b last:border-b-0">
                <h4 className="mb-2">{item.question}</h4>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline">
              Voir toutes les questions fréquentes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="mt-8 bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="mb-2">Urgence pendant votre location</h3>
              <p className="text-gray-600 mb-3">
                En cas de problème urgent avec votre équipement pendant votre randonnée, 
                contactez notre ligne d'assistance disponible 7j/7
              </p>
              <p className="text-red-600">
                📞 Assistance urgente: 06 98 76 54 32
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
