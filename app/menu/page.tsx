"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/page-header"

// Map menu tabs to background images
const menuBackgrounds: Record<string, string> = {
  appetizers: "/images/food/appetizers.jpg",
  burgers: "/images/food/burger.jpg",
  pizza: "/images/food/pizza.jpg",
  sandwiches: "/images/food/sandwiches.jpg",
  salads: "/images/food/salads.jpg",
  "taps-cocktails": "/images/food/taps & cocktails.jpg",
  happyhour: "/images/food/happy hour.jpg",
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("appetizers")

  return (
    <div className="relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src={menuBackgrounds[activeTab]}
          alt="Menu background"
          fill
          className="object-cover transition-opacity duration-500"
          priority
          key={activeTab}
        />
        <div className="absolute inset-0 bg-black/80 dark:bg-black/90"></div>
      </div>

      <div className="relative z-10 container py-12">
      <PageHeader
        title="Menus"
        description="Indulge in delicious American cuisine while enjoying your game. From appetizers to entrees, we've got something for everyone."
        centered
      />

      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Restaurant area with tables and bar"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Dine While You Bowl</h2>
          <p className="mb-6 text-gray-200">
            At our Bar & Grill, we offer a full menu of delicious food and beverages that can be enjoyed right at
            your lane or in our restaurant area. Our menu features classic American favorites, from juicy burgers to
            crispy pizzas, as well as a selection of craft beers and cocktails.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <Tabs defaultValue="appetizers" className="w-full" onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex w-auto min-w-full md:grid md:grid-cols-7 md:w-full">
              <TabsTrigger value="appetizers" className="flex-1 min-w-[100px]">Appetizers</TabsTrigger>
              <TabsTrigger value="burgers" className="flex-1 min-w-[100px]">Burgers</TabsTrigger>
              <TabsTrigger value="pizza" className="flex-1 min-w-[100px]">Pizza</TabsTrigger>
              <TabsTrigger value="sandwiches" className="flex-1 min-w-[100px]">Sandwiches</TabsTrigger>
              <TabsTrigger value="salads" className="flex-1 min-w-[100px]">Salads</TabsTrigger>
              <TabsTrigger value="taps-cocktails" className="flex-1 min-w-[100px]">Taps & Cocktails</TabsTrigger>
              <TabsTrigger value="happyhour" className="flex-1 min-w-[100px]">Happy Hour</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="appetizers" className="mt-6">
            <h3 className="text-2xl font-bold mb-6 text-white">STARTERS</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>FRENCH FRIES</CardTitle>
                    <span className="font-bold">$8</span>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>WAFFLE FRIES</CardTitle>
                    <span className="font-bold">$8</span>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>ONION RINGS</CardTitle>
                    <span className="font-bold">$9.5</span>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>VEGGIE TRAY</CardTitle>
                    <span className="font-bold">$9</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Farm fresh vegetables
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>MOZZARELLA STICKS</CardTitle>
                    <span className="font-bold">$10.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Served with marinara, topped with parmesan cheese
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>QUESADILLA</CardTitle>
                    <span className="font-bold">$11</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Topped with pico de gallo, served with chips, sour cream & red salsa. Add Chicken +$4 or Steak +$5
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>HUMMUS TRIO</CardTitle>
                    <span className="font-bold">$12</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Three fresh Mediterranean style dips: Plain, Edamame, and Red Pepper. Served with pita & veggies
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>IRISH NACHOS</CardTitle>
                    <span className="font-bold">$19</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Waffle cut fries, hot cheese sauce, topped with shredded cheddar, crispy bacon & green onions
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CONCOURSE NACHOS</CardTitle>
                    <span className="font-bold">$17.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Tortilla chips, guacamole, red salsa, sour cream, nacho cheese, black bean puree, jalapenos & pico de gallo. Add Chicken +$4 or steak for +$5
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CHICKEN STRIPS (3)</CardTitle>
                    <span className="font-bold">$14.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Breaded white meat chicken, regular or spicy buffalo, served with fries
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>PRETZEL STICKS (6)</CardTitle>
                    <span className="font-bold">$12.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Bakery fresh, served with nacho cheese & mustard
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CHICKEN WINGS (8)</CardTitle>
                    <span className="font-bold">$16</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Jumbo bone-in wings tossed in your choice of buffalo, garlic parmesan, Asian zing or naked
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>SHRIMP TACOS (3)</CardTitle>
                    <span className="font-bold">$14.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Flour shell shrimp tacos filled with melted mozzarella cheese, lettuce, pico de gallo & chipotle aioli. Served with black beans puree & tortilla chips
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>SLIDERS</CardTitle>
                    <span className="font-bold">$14.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Three beef patties served on sweet Hawaiian slider buns, topped with melted cheese, grilled onions & ketchup. Add fries +$2.50
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>BEEF TAQUITOS</CardTitle>
                    <span className="font-bold">$12</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Three rolled tacos filled with tender braised beef and cheese. Fried to order and served with guacamole, shredded iceberg lettuce, tomatillo salsa, sour cream and pico de gallo.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>SOUTHWEST RICE BOWL</CardTitle>
                    <span className="font-bold">$10</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Steaming bed of rice. Features black bean-corn and tomatillo salsas, cheddar cheese, chipotle aioli, diced avocado and fajita vegetables. Topped with crispy tortilla strips
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="burgers" className="mt-6">
            <h3 className="text-2xl font-bold mb-6 text-white">BURGERS</h3>
            <div className="mb-4 p-4 bg-muted rounded-md">
              <p>Includes French Fries or Side Salad. Upgrade: Veggies or Waffle Fries for +$2.50, Onion Rings +$3.</p>
              <p>Add cheese +$1.50: American, Swiss, Pepper Jack. Add Bacon +$3, Avocado +$1.50.</p>
              <p>Bread: Hamburger Bun, Sourdough or Ciabatta.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>SMASH BURGER</CardTitle>
                    <span className="font-bold">$13</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Two smashed beef patties, topped with American cheese, grilled onions, ketchup, mustard, on a fresh burger bun
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>THE CLASSIC CHEESEBURGER</CardTitle>
                    <span className="font-bold">$14.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Custom blended beef patty, American cheese, lettuce, tomato, onion & 1000 island dressing, on a fresh burger bun
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CALI BURGER</CardTitle>
                    <span className="font-bold">$16</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Custom blended beef patty, bacon, pepper jack cheese, avocado, chipotle aioli, served on a fresh burger bun
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>BBQ BACON CHEESEBURGER</CardTitle>
                    <span className="font-bold">$16</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Custom blended beef patty, onion straws, bacon, American cheese & BBQ sauce, served on a fresh burger bun
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pizza" className="mt-6">
            <h3 className="text-2xl font-bold mb-6 text-white">PIZZAS</h3>
            <div className="mb-4 p-4 bg-muted rounded-md">
              <p>All Pies Prepared With Our Housemade Pizza Sauce & Hand Grated Mozzarella Cheese.</p>
              <p>12" Medium Pizza - 8 Slices. 16" Large Pizza - 12 Slices.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-rose-400 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CHEESE PIZZA</CardTitle>
                    <span className="font-bold">$17 / $20</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Hand grated mozzarella cheese
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-rose-400 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>PEPPERONI PIZZA</CardTitle>
                    <span className="font-bold">$19.50 / $22.50</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Hand grated mozzarella cheese topped with pepperoni
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-rose-400 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>BOWLERS COMBO</CardTitle>
                    <span className="font-bold">$23 / $26</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sausage, Pepperoni, Mushrooms, Onions, Bell Peppers
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-rose-400 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>MEAT LOVERS</CardTitle>
                    <span className="font-bold">$23 / $26</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Pepperoni, Ham, Italian Sausage, Applewood Smoked Bacon
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-rose-400 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>VEGGIE LOVERS</CardTitle>
                    <span className="font-bold">$20 / $23</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Mushrooms, Onions, Bell Peppers, Tomatoes, Olives, Banana Peppers
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-rose-400 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>BBQ CHICKEN</CardTitle>
                    <span className="font-bold">$22 / $25</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Chicken Breast, Cilantro, Onions, BBQ Sauce
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-rose-400 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>HAWAIIAN</CardTitle>
                    <span className="font-bold">$20 / $23</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Ham & Pineapple
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-rose-400 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>HOT HONEY PEPPERONI</CardTitle>
                    <span className="font-bold">$22 / $25</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Double Pepperoni, Fresno Chiles, Drizzled with Hot Honey
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sandwiches" className="mt-6">
            <h3 className="text-2xl font-bold mb-6 text-white">SANDWICHES</h3>
            <div className="mb-4 p-4 bg-muted rounded-md">
              <p>Includes French Fries or Side Salad. Upgrade: Veggies or Waffle Fries for +$2.50, Onion Rings +$3.</p>
              <p>Add cheese +$1.50: American, Swiss, Pepper Jack. Add Bacon +$3, Avocado +$1.50.</p>
              <p>Bread: Hamburger Bun, Sourdough or Ciabatta.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CHICKEN SANDWICH</CardTitle>
                    <span className="font-bold">$13.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Grilled chicken breast served on a toasted burger bun and topped with lettuce, tomato, red onion and mayo. Served with French fries
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>TURKEY AVOCADO</CardTitle>
                    <span className="font-bold">$15</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sliced turkey breast, Swiss cheese, avocado on a ciabatta roll, with lettuce, tomato & mayo
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>GRILLED CHEESE</CardTitle>
                    <span className="font-bold">$10</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Served with fries. Add ham for +$3
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>ITALIAN SANDWICH</CardTitle>
                    <span className="font-bold">$12.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Shaved ham, pepperoni, iceberg lettuce, tomato, red onion, Italian dressing & mayo on a ciabatta roll. Served with French fries
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="salads" className="mt-6">
            <h3 className="text-2xl font-bold mb-6 text-white">SALADS</h3>
            <div className="mb-4 p-4 bg-muted rounded-md">
              <p>Dressings: Ranch, Italian, Thousand Island, Caesar, Sesame Soy, Blue Cheese.</p>
              <p>Add Proteins: +$4 Chicken, +$5 Steak, +$5 Shrimp.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>HOUSE SALAD</CardTitle>
                    <span className="font-bold">$8</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Romaine lettuce, tomato, cucumber, mozzarella & carrots
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CAESAR SALAD</CardTitle>
                    <span className="font-bold">$8.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Romaine lettuce, parmesan cheese, croutons tossed in Caesar dressing
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CHINESE CHICKEN SALAD</CardTitle>
                    <span className="font-bold">$14</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Grilled chicken breast, shredded cabbage, romaine lettuce, sweet & savory toasted sesame dressing. Includes fried rice noodles, carrots, mandarin oranges, green onions & sesame seeds
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>TACO SALAD</CardTitle>
                    <span className="font-bold">$14</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Black beans, shredded lettuce and seasoned ground beef, topped with shredded cheddar cheese, avocado, pico de gallo and sour cream. Served with tortilla ships & chipotle ranch dressing
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>COBB SALAD</CardTitle>
                    <span className="font-bold">$15</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Grilled chicken, romaine lettuce, bacon, hardboiled egg, avocado, blue cheese crumbles & tomatoes
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="taps-cocktails" className="mt-6 text-white">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-white">On Tap</h3>
              
              {/* FRUITY SECTION */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 pb-2 border-b text-white">FRUITY</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">8</span>
                        <span className="font-medium text-white">BREWERY X HUCKLEBERRY SELTZER</span>
                        <span className="text-gray-400">5%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">HUCKLEBERRY FLAVORED SPIKED SELTZER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">8</span>
                        <span className="font-medium">CALI SQUEEZE BLOOD ORANGE</span>
                        <span className="text-muted-foreground">5.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">BLOOD ORANGE HEFE</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">8</span>
                        <span className="font-medium">GOLDENROAD MANGO CART</span>
                        <span className="text-muted-foreground">4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">MANGO FLAVORED WHEAT BEER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">8</span>
                        <span className="font-medium">ANGRY ORCHARD</span>
                        <span className="text-muted-foreground">5.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">CRISP HARD APPLE CIDER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">9</span>
                        <span className="font-medium">BOTTLE LOGIC HONEYDEW LIME</span>
                        <span className="text-muted-foreground">8.0%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">LIME GREEN HARD SELTZER WITH HONEY-DEW</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* DARK & MALTY SECTION */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 pb-2 border-b text-white">DARK & MALTY</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">9</span>
                        <span className="font-medium">ALASKAN AMBER</span>
                        <span className="text-muted-foreground">5.3%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">TOASTY, NUTTY, AND CARAMEL MALT</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">9</span>
                        <span className="font-medium">GUINNESS</span>
                        <span className="text-muted-foreground">4.2%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">IRISH DRY STOUT</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* IPAS SECTION */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 pb-2 border-b text-white">IPAS</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">9</span>
                        <span className="font-medium">BREWERY X SLAP AND TICKLE</span>
                        <span className="text-muted-foreground">6.7%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">TROPICAL WEST COAST IPA</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">9</span>
                        <span className="font-medium">ELYSIAN SPACE DUST</span>
                        <span className="text-muted-foreground">8.2%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">A BITTER IPA WITH SOME HOPPY SWEETNESS</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">9</span>
                        <span className="font-medium">HARLAND BREWING HAZY IPA</span>
                        <span className="text-muted-foreground">6.5%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">IT'S HAZY. IT'S AN IPA. NOT OVERWHELMINGLY BITTER.</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">9</span>
                        <span className="font-medium">BOTTLE LOGIC - FUZZY LOGIC</span>
                        <span className="text-muted-foreground">7.1%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">HAZY IPA</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">9</span>
                        <span className="font-medium">SIERRA NEVADA - CELEBRATION</span>
                        <span className="text-muted-foreground">6.8%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">CITRUS PINE IPA</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* IMPORT SECTION */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 pb-2 border-b text-white">IMPORT</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">8</span>
                        <span className="font-medium">STELLA</span>
                        <span className="text-muted-foreground">5%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">CLASSIC BELGIAN LAGER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">8</span>
                        <span className="font-medium">PACIFICO</span>
                        <span className="text-muted-foreground">4.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">CLASSIC MEXICAN PILSNER</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* BLONDES/ALES SECTION */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 pb-2 border-b text-white">BLONDES/ALES</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">8</span>
                        <span className="font-medium">BREWERY X BLONDE</span>
                        <span className="text-muted-foreground">4.7%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">EASY DRINKING, GOLDEN BLONDE ALE</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">8</span>
                        <span className="font-medium">805</span>
                        <span className="text-muted-foreground">4.7%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">SUBTLY SWEET BLONDE ALE</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">8</span>
                        <span className="font-medium">KONA BIGWAVE</span>
                        <span className="text-muted-foreground">4.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">GOLDEN HAWAIIAN ALE WITH A TROPICAL HOP AROMA</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* DOMESTIC SECTION */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 pb-2 border-b text-white">DOMESTIC</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">7</span>
                        <span className="font-medium">COORS LIGHT</span>
                        <span className="text-muted-foreground">4.2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">7</span>
                        <span className="font-medium">MICHELOB ULTRA</span>
                        <span className="text-muted-foreground">4.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-white">Specialty Cocktails</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">COSMIC PALOMA</span>
                      <span className="font-bold">$12</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Herradura Silver Tequila, grapefruit Jarritos, Tajin rim, lime wedge garnish</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">LYNCHBURG LEMONADE</span>
                      <span className="font-bold">$12</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Jack Daniels, Triple Sec, Sweet & Sour, Starry with Lemon & Cherry</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">IRISH MULE</span>
                      <span className="font-bold">$12</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Jameson Irish Whiskey, Lime Juice, Cutwater Ginger Beer with Lime</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">HACIENDA MARGARITA</span>
                      <span className="font-bold">$12</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Pineapple / Jalapeno Dulce Vida, Concierge Triple Sec, Sweet & Sour, freshly squeezed lime juice and lime garnish</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">THE OLD TRAVELER</span>
                      <span className="font-bold">$12</span>
                    </div>
                    <p className="text-sm text-muted-foreground">An Old Fashioned with Traveler American Whiskey, Sugar Cube, Bitters, with Orange & Cherry garnish</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">ESPRESSO MARTINI</span>
                      <span className="font-bold">$12</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Smirnoff Vanilla Vodka, Kapali Coffee Liquor, Borghetti Cafe Espresso</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-muted rounded-md">
                <p className="font-medium text-center">All specialty cocktails are available for $10 during Happy Hour!</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="happyhour" className="mt-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4 text-white">HAPPY HOUR MENU</h3>
              <p className="text-lg mb-4 text-gray-200">Mon: Open to Close; Tues: 2pm-6pm; Wed: 2pm-6pm & 9pm-Close; Thu & Fri: 2pm-6pm</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>HAPPY HOUR BAR FOOD</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">MEDIUM CHEESE PIZZA</span>
                        <p className="text-sm text-muted-foreground">Hand Tossed Cheese Pizza</p>
                      </div>
                      <span className="font-bold">$12.50</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">MEDIUM PEPPERONI PIZZA</span>
                        <p className="text-sm text-muted-foreground">Hand Tossed Pepperoni Pizza</p>
                      </div>
                      <span className="font-bold">$14.50</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">SLIDERS</span>
                        <p className="text-sm text-muted-foreground">Three Slider Burgers</p>
                      </div>
                      <span className="font-bold">$12.50</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">PRETZEL STICKS (6)</span>
                        <p className="text-sm text-muted-foreground">Served with Cheese & Mustard Sauce</p>
                      </div>
                      <span className="font-bold">$10</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">HUMMUS TRIO</span>
                        <p className="text-sm text-muted-foreground">Three fresh mediterranean style dips: Plain, Edamame & Red Pepper</p>
                      </div>
                      <span className="font-bold">$10</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">IRISH NACHO</span>
                        <p className="text-sm text-muted-foreground">Waffle cut fries, hot cheese sauce, stopped with shredded cheddar, crispy bacon & green onions.</p>
                      </div>
                      <span className="font-bold">$16</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">TAQUITOS</span>
                        <p className="text-sm text-muted-foreground">Three rolled tacos filled with tender braised beef and cheese. Served with guacamole, lettuce, salsa, sour cream & pico de gallo.</p>
                      </div>
                      <span className="font-bold">$10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>HAPPY HOUR PINTS & GLASSES</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">MICHELOBE ULTRA</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$5</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">CONCOURSE BLONDE</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$6</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">COORS LIGHT</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$5</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">CALI SQUEEZE</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$6</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">KONA BIG WAVE</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$6</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">ATHLETICS</span>
                        <p className="text-sm text-muted-foreground">Can - Non-Alcoholic</p>
                      </div>
                      <span className="font-bold">$5</span>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <p className="font-medium mb-2">WINE BY THE GLASS</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">TRINITY OAKS</span>
                        <p className="text-sm text-muted-foreground">Chardonnay, Pinot Grigio, Merlot or Cabernet</p>
                      </div>
                      <span className="font-bold">$6</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>HAPPY HOUR SPECIALTY COCKTAILS</CardTitle>
                  <CardDescription>All Specialty Cocktails are $10 during Happy Hour</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">COSMIC PALOMA</span>
                        <p className="text-sm text-muted-foreground">Herradura Silver Tequila, grapefruit Jarritos, Tajin rim, lime wedge garnish</p>
                      </div>
                      <span className="font-bold">$10</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">LYNCHBURG LEMONDADE</span>
                        <p className="text-sm text-muted-foreground">Jack Daniels, Triple Sec, Sweet & Sour, Starry with Lemon & Cherry</p>
                      </div>
                      <span className="font-bold">$10</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">IRISH MULE</span>
                        <p className="text-sm text-muted-foreground">Jameson Irish Whiskey, Lime Juice, Cutwater Ginger Beer with Lime</p>
                      </div>
                      <span className="font-bold">$10</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">HACIENDA MARGARITA</span>
                        <p className="text-sm text-muted-foreground">Pineapple / Jalapeno Dulce Vida, Concierge Triple Sec, Sweet & Sour, freshly squeezed lime juice and lime garnish</p>
                      </div>
                      <span className="font-bold">$10</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">THE OLD TRAVELER</span>
                        <p className="text-sm text-muted-foreground">An Old Fashioned with Traveler American Whiskey, Sugar Cube, Bitters, with Orange & Cherry garnish</p>
                      </div>
                      <span className="font-bold">$10</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">ESPRESSO MARTINI</span>
                        <p className="text-sm text-muted-foreground">Smirnoff Vanilla Vodka, Kapali Coffee Liquor, Borghetti Cafe Espresso</p>
                      </div>
                      <span className="font-bold">$10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </div>
  )
}

