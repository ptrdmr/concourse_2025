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
  burgers: "/images/food/homepage_bar_cafe.jpg",
  pizza: "/images/food/pizza.jpg",
  sandwiches: "/images/food/sandwiches.jpg",
  salads: "/images/food/salads.jpg",
  "taps-cocktails": "/images/food/taps & cocktails.jpg",
  happyhour: "/images/food/happy hour.jpg",
  kids: "/images/food/appetizers.jpg",
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
          sizes="100vw"
          key={activeTab}
        />
        <div className="absolute inset-0 bg-black/80 dark:bg-black/90"></div>
      </div>

      <div className="relative z-10 container py-12">
      <PageHeader
        title="Bar & Cafe"
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
            sizes="(max-width: 768px) 100vw, 50vw"
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
            <TabsList className="inline-flex w-auto min-w-full md:grid md:grid-cols-8 md:w-full">
              <TabsTrigger value="appetizers" className="flex-1 min-w-[100px]">Appetizers</TabsTrigger>
              <TabsTrigger value="burgers" className="flex-1 min-w-[100px]">Burgers</TabsTrigger>
              <TabsTrigger value="pizza" className="flex-1 min-w-[100px]">Pizza</TabsTrigger>
              <TabsTrigger value="sandwiches" className="flex-1 min-w-[100px]">Sandwiches</TabsTrigger>
              <TabsTrigger value="salads" className="flex-1 min-w-[100px]">Salads</TabsTrigger>
              <TabsTrigger value="taps-cocktails" className="flex-1 min-w-[100px]">Taps & Cocktails</TabsTrigger>
              <TabsTrigger value="happyhour" className="flex-1 min-w-[100px]">Happy Hour</TabsTrigger>
              <TabsTrigger value="kids" className="flex-1 min-w-[100px]">Jr. Bowlers</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="appetizers" className="mt-6">
            <h3 className="text-2xl font-bold mb-6 text-white">STARTERS</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>FRENCH FRIES</CardTitle>
                    <span className="font-bold">$7</span>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>WAFFLE FRIES</CardTitle>
                    <span className="font-bold">$9</span>
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
                    Topped with pico de gallo, served with chips, sour cream & red salsa. Add Chicken +$4 · Steak or Shrimp +$5
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>HUMMUS & PITA</CardTitle>
                    <span className="font-bold">$12</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Creamy chickpea hummus topped with a marinated tomato olive relish. Served with warm pita bread and fresh vegetables
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>IRISH NACHOS</CardTitle>
                    <span className="font-bold">$20</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Waffle cut fries, hot cheese sauce, topped with shredded cheddar, crispy bacon & green onions. Feeds 4–6
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
                    Tortilla chips, guacamole, red salsa, sour cream, nacho cheese, black bean puree, jalapenos & pico de gallo. Feeds 4–6. Add Chicken +$4 · Steak +$5
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
                    <span className="font-bold">$15</span>
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
                    Three sliders on sweet Hawaiian buns. Choose from classic cheeseburger, jerk chicken with pickled onions, or pulled pork with BBQ sauce & onion strings. One style per order. Add fries +$2.50
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>TACO PLATE</CardTitle>
                    <span className="font-bold">$12</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Three soft corn tortillas filled with your choice of chicken, pork carnitas or beef carne asada. Topped with diced red onion & cilantro. Includes tortilla chips, black beans and fire roasted salsa
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CHICKEN LETTUCE CUPS</CardTitle>
                    <span className="font-bold">$13</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Seasoned ground chicken with onions, peppers & rice noodles in crisp lettuce leaves. Served with chili dipping sauce and chili roasted peanuts
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>SOUP OF THE DAY</CardTitle>
                    <span className="font-bold">$6</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Ask your server!</CardDescription>
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
                    Steaming bed of long grain rice with black bean-corn and tomatillo salsas, cheddar cheese, chipotle aioli, diced avocado and fajita vegetables. Topped with crispy tortilla strips. Add Chicken +$4 · Steak or Shrimp +$5
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="burgers" className="mt-6">
            <h3 className="text-2xl font-bold mb-6 text-white">BURGERS</h3>
            <div className="mb-4 p-4 bg-muted rounded-md">
              <p>Includes French Fries or Side Salad. Upgrade: Veggies +$2.50, Onion Rings or Waffle Fries +$3.</p>
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
                    Two smashed beef patties, topped with American cheese, grilled onions, ketchup, mustard, on a fresh burger bun. Additional patty +$3
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
              <p>Build Your Own: additional toppings $1.50/each (veggie) · $2.50/each (meat).</p>
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
              <p>Includes French Fries or Side Salad. Upgrade: Veggies +$2.50, Onion Rings or Waffle Fries +$3.</p>
              <p>Add cheese +$1.50: American, Swiss, Pepper Jack. Add Bacon +$3, Avocado +$1.50.</p>
              <p>Bread: Hamburger Bun, Sourdough or Ciabatta.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>BBQ CHICKEN SANDWICH</CardTitle>
                    <span className="font-bold">$14</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    A plump chicken breast brushed with BBQ sauce and piled high with ham, American cheese and onion strings on a burger bun
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CLUB SANDWICH</CardTitle>
                    <span className="font-bold">$14</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Sliced turkey breast, ham, avocado, lettuce & tomato on toasted sourdough with mayo. Served with French fries
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>HOT ITALIAN</CardTitle>
                    <span className="font-bold">$13.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Hot & fresh out of the oven! A bakery fresh ciabatta roll topped with marinara sauce, shredded mozzarella cheese, basil, pepperoncini, pepperoni & sausage. Then oven baked until bubbly & crisp
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>CHIPOTLE CHICKEN MELT</CardTitle>
                    <span className="font-bold">$15</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    A tender chicken breast on a fresh ciabatta roll with chipotle aioli & shredded mozzarella cheese. Served hot & fresh from the oven, topped with lettuce, tomato & sliced cucumber
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
                    <CardTitle>SOUP & HALF SANDWICH</CardTitle>
                    <span className="font-bold">$10</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    A half sandwich (grilled cheese or BLT) on sourdough bread, paired with a cup of our housemade soup of the day
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
                    <span className="font-bold">$9</span>
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
                    <span className="font-bold">$9.5</span>
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
                    Black beans, shredded lettuce and seasoned ground beef, topped with shredded cheddar cheese, avocado, pico de gallo and sour cream. Served with tortilla chips & chipotle ranch dressing
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>COBB SALAD</CardTitle>
                    <span className="font-bold">$15.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Grilled chicken, romaine lettuce, bacon, hardboiled egg, avocado, blue cheese crumbles & tomatoes
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>MISO SHRIMP SALAD</CardTitle>
                    <span className="font-bold">$15</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Grilled shrimp over chopped kale and romaine, dried cranberries, sliced almonds, tossed in miso dressing
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
                        <span className="text-lg font-bold text-white">$9</span>
                        <span className="font-medium text-white">BREWERY X HUCKLEBERRY SELTZER</span>
                        <span className="text-gray-400">5%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">HUCKLEBERRY FLAVORED SPIKED SELTZER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">$8</span>
                        <span className="font-medium text-white">TRULY WILD BERRY</span>
                        <span className="text-gray-400">5%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">WILD BERRY HARD SELTZER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">CALI SQUEEZE BLOOD ORANGE</span>
                        <span className="text-muted-foreground">5.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">BLOOD ORANGE HEFE</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">GOLDEN ROAD MANGO CART</span>
                        <span className="text-muted-foreground">4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">MANGO FLAVORED WHEAT BEER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">ANGRY ORCHARD</span>
                        <span className="text-muted-foreground">5.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">CRISP HARD APPLE CIDER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$10</span>
                        <span className="font-medium">BOTTLE LOGIC BLUEBERRY LAVENDER LEMONADE</span>
                        <span className="text-muted-foreground">5.7%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">FRUITED HARD SELTZER WITH BLUEBERRY, FLORAL LAVENDER &amp; CITRUS</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">4 SONS BREWING – VACATION PINEAPPLE</span>
                        <span className="text-muted-foreground">5%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">PINEAPPLE SESSION ALE</p>
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
                        <span className="text-lg font-bold">$10</span>
                        <span className="font-medium">GUINNESS</span>
                        <span className="text-muted-foreground">4.2%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">IRISH DRY STOUT</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$10</span>
                        <span className="font-medium">NAUGHTY SAUCE</span>
                        <span className="text-muted-foreground">5.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">GOLDEN MILK STOUT</p>
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
                        <span className="text-lg font-bold">$10</span>
                        <span className="font-medium">BREWERY X SLAP AND TICKLE</span>
                        <span className="text-muted-foreground">6.7%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">TROPICAL WEST COAST IPA</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$10</span>
                        <span className="font-medium">ELYSIAN SPACE DUST</span>
                        <span className="text-muted-foreground">8.2%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">A BITTER IPA WITH SOME HOPPY SWEETNESS</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$10</span>
                        <span className="font-medium">BOTTLE LOGIC DBL ACTUATOR</span>
                        <span className="text-muted-foreground">8.5%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">A DIPA WITH A BOLD WEST COAST PROFILE</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$10</span>
                        <span className="font-medium">BOTTLE LOGIC – FUZZY LOGIC</span>
                        <span className="text-muted-foreground">7.1%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">HAZY PEACH IPA</p>
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
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">STELLA</span>
                        <span className="text-muted-foreground">5%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">BELGIAN LAGER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">PACIFICO</span>
                        <span className="text-muted-foreground">4.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">MEXICAN PILSNER</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">MODELO</span>
                        <span className="text-muted-foreground">4.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">MEXICAN PILSNER</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* BLONDES/ALES SECTION */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 pb-2 border-b text-white">BLONDES / ALES</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">BREWERY X BLONDE</span>
                        <span className="text-muted-foreground">4.7%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">EASY DRINKING, GOLDEN BLONDE ALE</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">805</span>
                        <span className="text-muted-foreground">4.7%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">SUBTLY SWEET BLONDE ALE</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$9</span>
                        <span className="font-medium">BLUE MOON</span>
                        <span className="text-muted-foreground">5.4%</span>
                      </div>
                      <p className="text-sm text-lime-500 font-medium">BELGIAN-STYLE WHEAT ALE</p>
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
                        <span className="text-lg font-bold">$8</span>
                        <span className="font-medium">COORS LIGHT</span>
                        <span className="text-muted-foreground">4.2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">$8</span>
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
                      <span className="font-bold">$13</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Herradura Silver Tequila, grapefruit Jarritos, Tajin rim, lime wedge garnish</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">LYNCHBURG LEMONADE</span>
                      <span className="font-bold">$13</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Jack Daniels, Triple Sec, Sweet & Sour, Starry with Lemon & Cherry</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">IRISH MULE</span>
                      <span className="font-bold">$13</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Jameson Irish Whiskey, Lime Juice, Cutwater Ginger Beer with Lime</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">HACIENDA MARGARITA</span>
                      <span className="font-bold">$13</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Pineapple / Jalapeno Dulce Vida, Concierge Triple Sec, Sweet & Sour, freshly squeezed lime juice and lime garnish</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">THE OLD TRAVELER</span>
                      <span className="font-bold">$13</span>
                    </div>
                    <p className="text-sm text-muted-foreground">An Old Fashioned with Traveler American Whiskey, Sugar Cube, Bitters, with Orange & Cherry garnish</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">ESPRESSO MARTINI</span>
                      <span className="font-bold">$13</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Smirnoff Vanilla Vodka, Kapali Coffee Liquor, Borghetti Cafe Espresso</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-muted rounded-md">
                <p className="font-medium text-center">All specialty cocktails are available for $11 during Happy Hour!</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="happyhour" className="mt-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4 text-white">HAPPY HOUR MENU</h3>
              <p className="text-lg mb-4 text-gray-200">Mon: Open to Close; Tue-Thu: 2pm-6pm & 9pm-Close; Fri: 2pm-6pm</p>
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
                        <span className="font-medium">CONCOURSE NACHO</span>
                        <p className="text-sm text-muted-foreground">Tortilla chips, guacamole, salsa, sour cream, nacho cheese, black bean, jalapeños & pico. Add Chicken +$4 | Steak +$5</p>
                      </div>
                      <span className="font-bold">$15</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">LETTUCE CUPS</span>
                        <p className="text-sm text-muted-foreground">Jerk-spiced chicken, grilled onions & peppers, rice noodles & chili peanuts with dipping sauce</p>
                      </div>
                      <span className="font-bold">$11</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">TACO PLATE</span>
                        <p className="text-sm text-muted-foreground">Three soft corn tortillas — Chicken, Carnitas, or Carne Asada. Chips, beans & salsa included</p>
                      </div>
                      <span className="font-bold">$11</span>
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
                        <span className="font-medium">CONCOURSE BLONDE</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$7</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">MICHELOB ULTRA</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$7</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">COORS LIGHT</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$7</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">BLUE MOON</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$7</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">CALI SQUEEZE</span>
                        <p className="text-sm text-muted-foreground">16oz Pint</p>
                      </div>
                      <span className="font-bold">$7</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">LOGIC LIGHT</span>
                        <p className="text-sm text-muted-foreground">16oz Can</p>
                      </div>
                      <span className="font-bold">$6</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">HAPPY DAD GRAPE</span>
                        <p className="text-sm text-muted-foreground">24oz Can</p>
                      </div>
                      <span className="font-bold">$8</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">ATHLETICS</span>
                        <p className="text-sm text-muted-foreground">Can - Non-Alcoholic</p>
                      </div>
                      <span className="font-bold">$6.50</span>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <p className="font-medium mb-2">WINE BY THE GLASS</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">JOSH CELLARS</span>
                        <p className="text-sm text-muted-foreground">Chardonnay, Pinot Grigio, Merlot or Cabernet</p>
                      </div>
                      <span className="font-bold">$8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>HAPPY HOUR SPECIALTY COCKTAILS</CardTitle>
                  <CardDescription>All Specialty Cocktails are $11 during Happy Hour (Regular $13)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">COSMIC PALOMA</span>
                        <p className="text-sm text-muted-foreground">Herradura Silver Tequila, grapefruit Jarritos, Tajin rim, lime wedge garnish</p>
                      </div>
                      <span className="font-bold">$11</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">LYNCHBURG LEMONDADE</span>
                        <p className="text-sm text-muted-foreground">Jack Daniels, Triple Sec, Sweet & Sour, Starry with Lemon & Cherry</p>
                      </div>
                      <span className="font-bold">$11</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">IRISH MULE</span>
                        <p className="text-sm text-muted-foreground">Jameson Irish Whiskey, Lime Juice, Cutwater Ginger Beer with Lime</p>
                      </div>
                      <span className="font-bold">$11</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">HACIENDA MARGARITA</span>
                        <p className="text-sm text-muted-foreground">Pineapple / Jalapeno Dulce Vida, Concierge Triple Sec, Sweet & Sour, freshly squeezed lime juice and lime garnish</p>
                      </div>
                      <span className="font-bold">$11</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">THE OLD TRAVELER</span>
                        <p className="text-sm text-muted-foreground">An Old Fashioned with Traveler American Whiskey, Sugar Cube, Bitters, with Orange & Cherry garnish</p>
                      </div>
                      <span className="font-bold">$11</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">ESPRESSO MARTINI</span>
                        <p className="text-sm text-muted-foreground">Smirnoff Vanilla Vodka, Kapali Coffee Liquor, Borghetti Cafe Espresso</p>
                      </div>
                      <span className="font-bold">$11</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground italic">Happy Hour Not Valid on Holidays</p>
            </div>
          </TabsContent>

          <TabsContent value="kids" className="mt-6">
            <h3 className="text-2xl font-bold mb-6 text-white">JR. BOWLERS</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>MINI CORN DOGS</CardTitle>
                    <span className="font-bold">$10</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Served with fries</CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>KIDS SLIDERS</CardTitle>
                    <span className="font-bold">$11.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Two mini burgers with American cheese and ketchup. Served with French fries
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>KIDS CHICKEN STRIPS</CardTitle>
                    <span className="font-bold">$11.5</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>2 chicken fingers with fries</CardDescription>
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

