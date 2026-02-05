import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from './ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  FileText, 
  RotateCcw, 
  Shield, 
  BookOpen, 
  AlertCircle 
} from 'lucide-react';

const sections = [
  {
    id: 'borrow',
    icon: FileText,
    title: 'Conditions d\'emprunt',
    items: [
      {
        question: 'Comment emprunter du matériel ?',
        answer: 'Sélectionnez l\'équipement souhaité, choisissez vos dates de location, et ajoutez au panier. Vous pourrez finaliser votre réservation en ligne et retirer le matériel à notre point de retrait.'
      },
      {
        question: 'Quelle est la durée minimale de location ?',
        answer: 'La durée minimale de location est d\'une journée. Vous pouvez louer pour une durée allant de 1 jour à plusieurs semaines selon vos besoins.'
      },
      {
        question: 'Puis-je prolonger ma location ?',
        answer: 'Oui, vous pouvez prolonger votre location en nous contactant au moins 24h avant la date de retour prévue, sous réserve de disponibilité du matériel.'
      },
    ]
  },
  {
    id: 'return',
    icon: RotateCcw,
    title: 'Conditions de retour',
    items: [
      {
        question: 'Où et quand retourner le matériel ?',
        answer: 'Le matériel doit être retourné à notre point de retrait avant 18h le jour prévu. Des créneaux de retour sont disponibles du lundi au samedi de 9h à 18h.'
      },
      {
        question: 'Dans quel état retourner l\'équipement ?',
        answer: 'L\'équipement doit être retourné propre et dans le même état qu\'au moment du retrait. Un nettoyage léger est toléré, mais l\'équipement ne doit pas être boueux ou très sale.'
      },
      {
        question: 'Que se passe-t-il en cas de retard ?',
        answer: 'Un retard de retour entraîne des frais supplémentaires de 50% du tarif journalier par jour de retard. Au-delà de 2 jours de retard, la caution peut être retenue.'
      },
    ]
  },
  {
    id: 'deposit',
    icon: Shield,
    title: 'Caution & assurance',
    items: [
      {
        question: 'Quel est le montant de la caution ?',
        answer: 'Le montant de la caution varie selon l\'équipement loué, généralement entre 50€ et 300€. Elle est entièrement remboursée lors du retour du matériel en bon état.'
      },
      {
        question: 'Comment est versée la caution ?',
        answer: 'La caution est prélevée par empreinte bancaire lors du retrait du matériel. Aucun débit n\'est effectué sauf en cas de dommage ou non-retour de l\'équipement.'
      },
      {
        question: 'L\'équipement est-il assuré ?',
        answer: 'Tous nos équipements sont couverts pour les dommages normaux d\'utilisation. Pour les activités à risque, nous proposons une assurance complémentaire optionnelle à 3€/jour.'
      },
    ]
  },
  {
    id: 'usage',
    icon: BookOpen,
    title: 'Conseils d\'utilisation',
    items: [
      {
        question: 'Recevrai-je des instructions d\'utilisation ?',
        answer: 'Oui, chaque équipement est accompagné d\'une notice d\'utilisation. Notre équipe peut également vous expliquer le fonctionnement lors du retrait.'
      },
      {
        question: 'Puis-je tester l\'équipement avant de partir ?',
        answer: 'Absolument ! Nous vous encourageons à vérifier et tester l\'équipement lors du retrait. Notre équipe est là pour vous aider à vous familiariser avec le matériel.'
      },
      {
        question: 'Que faire en cas de problème pendant la location ?',
        answer: 'Contactez-nous immédiatement via notre ligne d\'assistance disponible 7j/7. Nous vous apporterons une solution ou un remplacement si nécessaire.'
      },
    ]
  },
  {
    id: 'safety',
    icon: AlertCircle,
    title: 'Sécurité & fiabilité',
    items: [
      {
        question: 'Comment est contrôlé le matériel ?',
        answer: 'Tout notre matériel est systématiquement vérifié, nettoyé et entretenu après chaque location. Des contrôles approfondis sont effectués régulièrement.'
      },
      {
        question: 'Que faire si je détecte un défaut ?',
        answer: 'Signalez-nous immédiatement tout défaut constaté. Nous remplacerons l\'équipement défectueux sans frais supplémentaires.'
      },
      {
        question: 'Le matériel est-il adapté aux débutants ?',
        answer: 'Oui, notre matériel convient à tous les niveaux. Nous pouvons vous conseiller sur le choix de l\'équipement adapté à votre expérience et votre activité.'
      },
    ]
  },
];

export function HelpInfoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Aide & Informations</h1>
        <p className="text-gray-600">
          Tout ce que vous devez savoir sur la location d'équipement
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 bg-emerald-50 border-emerald-200">
        <CardContent className="p-6">
          <h3 className="mb-2">Vous avez d'autres questions ?</h3>
          <p className="text-gray-600 mb-4">
            Notre équipe est disponible pour répondre à toutes vos interrogations
          </p>
          <p className="text-emerald-600">
            📞 Contactez-nous au 01 23 45 67 89
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
