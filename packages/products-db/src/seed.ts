import { prisma } from "./client"


export const seed = async () => {
  await prisma.$connect()
  if (await prisma.category.count() === 0) {
    await prisma.category.createMany({
      data: [
        {
          name: "jackets",
          slug: "jackets"
        },
        {
          name: "t-shirts",
          slug: "t-shirts"
        },
        {
          name: "shoes",
          slug: "shoes"
        },
        {
          name: "shirts",
          slug: "shirts"
        },
        {
          name: "Accessories",
          slug: "accessories"
        },
        {
          name: "Bags",
          slug: "bags"
        },
        {
          name: "Dresses",
          slug: "dresses"
        },
        {
          name: "Gloves",
          slug: "gloves"
        },
      ]
    })
  }
  if (await prisma.product.count() === 0) {
    await prisma.product.createMany({
      data: [
        {
          name: "Adidas CoreFit T-Shirt",
          categorySlug: "t-shirts",
          shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          price: 39.9,
          sizes: ["s", "m", "l", "xl", "xxl"],
          colors: ["gray", "purple", "green"],
          images: {
            gray: "/products/1g.png",
            purple: "/products/1p.png",
            green: "/products/1gr.png",
          },
        },
        {
          name: "Puma Ultra Warm Zip",
          categorySlug: "jackets",
          shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          price: 59.9,
          sizes: ["s", "m", "l", "xl"],
          colors: ["gray", "green"],
          images: { gray: "/products/2g.png", green: "/products/2gr.png" },
        },
        {
          name: "Nike Air Essentials Pullover",
          categorySlug: "jackets",
          shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          price: 69.9,
          sizes: ["s", "m", "l"],
          colors: ["green", "blue", "black"],
          images: {
            green: "/products/3gr.png",
            blue: "/products/3b.png",
            black: "/products/3bl.png",
          },
        },
        {
          name: "Nike Dri Flex T-Shirt",
          categorySlug: "t-shirts",
          shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          price: 29.9,
          sizes: ["s", "m", "l"],
          colors: ["white", "pink"],
          images: { white: "/products/4w.png", pink: "/products/4p.png" },
        },
        {
          name: "Under Armour StormFleece",
          categorySlug: "jackets",
          shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          price: 49.9,
          sizes: ["s", "m", "l"],
          colors: ["red", "orange", "black"],
          images: {
            red: "/products/5r.png",
            orange: "/products/5o.png",
            black: "/products/5bl.png",
          },
        },
        {
          name: "Nike Air Max 270",
          categorySlug: "shoes",
          shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          price: 59.9,
          sizes: ["40", "42", "43", "44"],
          colors: ["gray", "white"],
          images: { gray: "/products/6g.png", white: "/products/6w.png" },
        },
        {
          name: "Nike Ultraboost Pulse ",
          categorySlug: "shoes",
          shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          price: 69.9,
          sizes: ["40", "42", "43"],
          colors: ["gray", "pink"],
          images: { gray: "/products/7g.png", pink: "/products/7p.png" },
        }
        ,
        {
          name: "Levi's Classic Denim",
          categorySlug: "shirts",
          shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
          price: 59.9,
          sizes: ["s", "m", "l"],
          colors: ["blue", "green"],
          images: { blue: "/products/8b.png", green: "/products/8gr.png" },
        }
      ]
    })
  }

  await prisma.$disconnect()

}
await seed()