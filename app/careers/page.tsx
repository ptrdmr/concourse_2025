"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, DollarSign, MapPin } from "lucide-react"
import { PageHeader } from "@/components/page-header"

// Sample job listings - in a real application, this would come from a database
const jobs = [
  {
    id: 1,
    title: "Front Desk Associate",
    type: "Part-Time",
    location: "Anaheim, CA",
    salary: "$16 - $18 per hour",
    description:
      "We're looking for friendly, customer-oriented individuals to join our front desk team. Responsibilities include greeting customers, processing payments, assigning lanes, and answering phone calls.",
    requirements: [
      "Excellent customer service skills",
      "Basic computer knowledge",
      "Ability to work evenings and weekends",
      "Cash handling experience preferred",
      "Must be 18 years or older",
    ],
  },
  {
    id: 2,
    title: "Bartender",
    type: "Full-Time",
    location: "Anaheim, CA",
    salary: "$18 - $22 per hour + tips",
    description:
      "Join our bar team at our Bar & Grill. Responsibilities include preparing and serving alcoholic and non-alcoholic beverages, maintaining bar inventory, and providing excellent customer service.",
    requirements: [
      "Previous bartending experience required",
      "Knowledge of classic and contemporary cocktails",
      "Valid alcohol service certification",
      "Ability to work in a fast-paced environment",
      "Must be 21 years or older",
    ],
  },
  {
    id: 3,
    title: "Kitchen Staff",
    type: "Part-Time",
    location: "Anaheim, CA",
    salary: "$17 - $19 per hour",
    description:
      "We're seeking kitchen staff to prepare food items according to recipes and standards. Responsibilities include cooking, food preparation, and maintaining a clean kitchen environment.",
    requirements: [
      "Previous kitchen experience preferred",
      "Knowledge of food safety and sanitation practices",
      "Ability to work in a fast-paced environment",
      "Flexible availability including evenings and weekends",
      "Must be 18 years or older",
    ],
  },
  {
    id: 4,
    title: "Arcade Attendant",
    type: "Part-Time",
    location: "Anaheim, CA",
    salary: "$15 - $17 per hour",
    description:
      "We're looking for energetic individuals to maintain our arcade area. Responsibilities include assisting customers with game cards, troubleshooting game issues, and maintaining a clean arcade environment.",
    requirements: [
      "Customer service experience",
      "Basic technical troubleshooting skills",
      "Ability to work evenings and weekends",
      "Energetic and friendly demeanor",
      "Must be 16 years or older",
    ],
  },
  {
    id: 5,
    title: "Bowling Mechanic",
    type: "Full-Time",
    location: "Anaheim, CA",
    salary: "$22 - $28 per hour",
    description:
      "We're seeking an experienced bowling mechanic to maintain and repair our bowling equipment. Responsibilities include routine maintenance, troubleshooting, and repairs of pinsetters and related equipment.",
    requirements: [
      "Experience with Brunswick A2 pinsetters preferred",
      "Mechanical aptitude and problem-solving skills",
      "Ability to lift up to 50 pounds",
      "Flexible availability including evenings and weekends",
      "Must be 18 years or older",
    ],
  },
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(jobs[0])
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle the form submission here
    setFormSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <div className="container py-12">
      <PageHeader
        title="Join Our Team"
        description="Explore career opportunities at Concourse Bowling Center and become part of our fun, energetic team."
        centered
      />

      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image 
            src="/placeholder.svg?height=600&width=800" 
            alt="Team members working at bowling center" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-2xl font-bold">Why Work With Us?</h2>
          <p className="mb-6">
            At Concourse Bowling Center, we believe that our team members are the key to our success. We're committed to creating a positive, supportive work environment where you can grow and thrive.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary p-1 text-primary-foreground">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Flexible Scheduling</h3>
                <p className="text-sm text-muted-foreground">
                  We offer flexible scheduling to accommodate your lifestyle and commitments.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary p-1 text-primary-foreground">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Competitive Pay</h3>
                <p className="text-sm text-muted-foreground">
                  We offer competitive wages and regular performance reviews.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary p-1 text-primary-foreground">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Employee Discounts</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy free bowling, discounted food, and special employee events.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary p-1 text-primary-foreground">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Growth Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  We promote from within and provide training to help you advance your career.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Current Openings</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-none md:justify-start">
            <TabsTrigger value="all">All Positions</TabsTrigger>
            <TabsTrigger value="full-time">Full-Time</TabsTrigger>
            <TabsTrigger value="part-time">Part-Time</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map(job => (
                <Card 
                  key={job.id} 
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${selectedJob.id === job.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="full-time" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.filter(job => job.type === "Full-Time").map(job => (
                <Card 
                  key={job.id} 
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${selectedJob.id === job.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="part-time" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.filter(job => job.type === "Part-Time").map(job => (
                <Card 
                  key={job.id} 
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${selectedJob.id === job.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mb-16 grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>{selectedJob.title} - {selectedJob.type}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium">Description</h3>
              <p className="mt-2 text-muted-foreground">{selectedJob.description}</p>
            </div>
            <div>
              <h3 className="font-medium">Requirements</h3>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>How to Apply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium">In Person</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Visit us at 3364 E La Palmera Ave, Anaheim, CA 92806 to fill out an application in person.
              </p>
            </div>
            <div>
              <h3 className="font-medium">By Email</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Send your resume and cover letter to careers@concoursebowling.com
              </p>
            </div>
            <div>
              <h3 className="font-medium">Questions?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Call us at (714) 666-2695 for more information about our job openings.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

