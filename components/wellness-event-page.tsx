'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Clock, Plus, Minus, Instagram, Globe, X } from 'lucide-react'
import Image from 'next/image'

export function WellnessEventPageComponent() {
  const [tickets, setTickets] = useState([
    { name: 'Only Ice Bath', price: 10.00, quantity: 0 },
    { name: 'Run + Ice Bath', price: 10.00, quantity: 0 },
    { name: 'Yoga + Ice Bath', price: 10.00, quantity: 0 },
    { name: 'Breathwork + Icebath', price: 10.00, quantity: 0 },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', cardNumber: '', expiry: '' })

  const updateTicketQuantity = (index: number, change: number) => {
    const newTickets = [...tickets]
    newTickets[index].quantity = Math.max(0, newTickets[index].quantity + change)
    setTickets(newTickets)
  }

  const subtotal = tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)
  const vat = subtotal * 0.21
  const total = subtotal + vat

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    console.log('Tickets:', tickets.filter(t => t.quantity > 0))
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="bg-transparent border-none shadow-none">
              <CardContent className="p-0">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Wellness Morning Event"
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
            <div className="mt-4 flex space-x-4">
              <Instagram className="text-gray-600" />
              <Globe className="text-gray-600" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Präsentiert von</p>
              <p className="font-bold">Chillsnsip</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Veranstaltet von</p>
              <p className="font-bold">ChillsnSip</p>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">Wellness Morning | Icebath, Run, Yoga, Coffee & More</h1>
            <div className="flex items-center mb-2 text-gray-600">
              <Calendar className="mr-2" />
              <p>Samstag, 21. September</p>
            </div>
            <div className="flex items-center mb-2 text-gray-600">
              <Clock className="mr-2" />
              <p>9:00 - 12:15 MESZ</p>
            </div>
            <div className="flex items-center mb-4 text-gray-600">
              <MapPin className="mr-2" />
              <p>Boothuis, Amsterdam, Noord-Holland</p>
            </div>

            <Card className="bg-gray-100 mt-8">
              <CardHeader>
                <CardTitle>Tickets kaufen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Willkommen! Bitte wählen Sie Ihren gewünschten Tickettyp:</p>
                {tickets.map((ticket, index) => (
                  <div key={ticket.name} className="mb-4 p-4 border border-gray-300 rounded-lg bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{ticket.name}</h3>
                        <p className="text-sm">{ticket.price.toFixed(2)} €</p>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="icon" onClick={() => updateTicketQuantity(index, -1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2">{ticket.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => updateTicketQuantity(index, 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-bold">Total: {total.toFixed(2)} €</p>
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="ml-4" disabled={total === 0}>
                        Buy Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] bg-gray-900 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Deine Angaben</DialogTitle>
                        <Button 
                          variant="ghost" 
                          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                          onClick={() => setIsModalOpen(false)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </Button>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name" className="text-sm font-medium text-gray-300">
                              Name *
                            </Label>
                            <Input 
                              id="name" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleInputChange} 
                              className="mt-1 bg-gray-800 border-gray-700 text-white"
                              placeholder="Dein Name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                              E-Mail *
                            </Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleInputChange} 
                              className="mt-1 bg-gray-800 border-gray-700 text-white"
                              placeholder="du@email.com"
                            />
                          </div>
                          <div>
                            <Label className="text-xl font-bold mb-2 block">Zahlung</Label>
                            <Select>
                              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Card" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="card">Card</SelectItem>
                                <SelectItem value="paypal">PayPal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-300">
                              Kredit- oder Debitkarte *
                            </Label>
                            <div className="flex mt-1">
                              <Input 
                                id="cardNumber" 
                                name="cardNumber" 
                                value={formData.cardNumber} 
                                onChange={handleInputChange} 
                                className="flex-grow bg-gray-800 border-gray-700 text-white"
                                placeholder="Kartennummer"
                              />
                              <Input 
                                id="expiry" 
                                name="expiry" 
                                value={formData.expiry} 
                                onChange={handleInputChange} 
                                className="w-20 ml-2 bg-gray-800 border-gray-700 text-white"
                                placeholder="MM/JJ"
                              />
                            </div>
                          </div>
                          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Mit Karte bezahlen
                          </Button>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center mb-4">
                            <Image
                              src="/placeholder.svg?height=50&width=50"
                              width={50}
                              height={50}
                              alt="Event"
                              className="rounded mr-3"
                            />
                            <div>
                              <h3 className="font-bold">Wellness Morning | Icebath, Run, Yoga, Coffee & More</h3>
                              <p className="text-sm text-gray-400">21. Sept., 09:00 MESZ</p>
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Tickets</span>
                              <Button variant="link" className="text-blue-400 p-0 h-auto">Bearbeiten</Button>
                            </div>
                            {tickets.filter(t => t.quantity > 0).map((ticket, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{ticket.quantity}x {ticket.name}</span>
                                <span>{(ticket.price * ticket.quantity).toFixed(2)} €</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-gray-700 pt-4 mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Zwischensumme</span>
                              <span>{subtotal.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-sm text-blue-400 mb-1">
                              <span>Gutschein hinzufügen</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>VAT (21%)</span>
                              <span>{vat.toFixed(2)} €</span>
                            </div>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>Gesamt</span>
                            <span>{total.toFixed(2)} €</span>
                          </div>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 mt-8">
              <CardHeader>
                <CardTitle>Über die Veranstaltung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Experience the ultimate blend of wellness and connection</p>
                <p className="mb-4">Join us for an exclusive community event. Pick between a social 5k run around Sloterplas, a beautiful morning Yoga flow or a breathwork session. You can skip the activity and join straight for the ice bath and socialising time.</p>
                <h3 className="font-bold mb-2">Event Outline</h3>
                <p className="mb-2">Pre Plunge Activity:</p>
                <ul className="list-disc list-inside mb-4">
                  <li>Social Run: Kick off your morning with a scenic 5k run starting at Boothuis. Bag drop begins at 9:15 AM, followed by a warm-up at 9:30 AM.</li>
                  <li>Yoga Flow: Start with a ground-breathing exercise to help you centre and connect with the present moment.</li>
                  <li>Breathwork session: Join Kyra for some invigorating breath work before cold exposure.</li>
                </ul>
                <h3 className="font-bold mb-2">Ice Bath Experience</h3>
                <p>An exhilarating XL ice bath experience. Dive into the cold, accompanied by music and good vibes, perfect for connecting and bonding with our community members.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}