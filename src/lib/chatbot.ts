interface ChatbotResponse {
  message: string;
  quickReplies?: string[];
}

const responses: Record<string, ChatbotResponse> = {
  // Greetings
  hello: {
    message: "Hello! Welcome to Aali Tigana! I'm here to help you discover the finest dried fruits. What can I assist you with today?",
    quickReplies: ['Show me best sellers', 'I need healthy snacks', 'Tell me about shipping', 'Help me choose']
  },
  hi: {
    message: "Hi there! I'm your Aali Tigana assistant. How can I help you find the perfect dried fruits?",
    quickReplies: ['Browse products', 'Special offers', 'Nutritional info', 'Shipping details']
  },

  // Product inquiries
  'show me best sellers': {
    message: "Our best sellers are absolutely amazing! 🌟 Premium Medjool Dates, Turkish Dried Figs, and our Trail Mix Deluxe are customer favorites. They're loved for their exceptional quality and natural sweetness!",
    quickReplies: ['Tell me about dates', 'What about figs?', 'Trail mix info', 'View all products']
  },
  'best sellers': {
    message: "Here are our top-rated dried fruits: Premium Medjool Dates (★4.9), Turkish Dried Figs (★4.8), and Organic Turkish Apricots (★4.8). These are chosen by thousands of happy customers!",
    quickReplies: ['Medjool dates info', 'Turkish figs details', 'Apricot benefits', 'Add to cart help']
  },

  // Health and nutrition
  'i need healthy snacks': {
    message: "Perfect choice! Our dried fruits are nature's candy - packed with fiber, potassium, and antioxidants. Dates provide natural energy, figs are great for digestion, and apricots are rich in vitamin A. All with no added sugars!",
    quickReplies: ['Nutritional benefits', 'Organic options', 'Low sugar fruits', 'Portion recommendations']
  },
  'healthy snacks': {
    message: "Dried fruits are excellent healthy snacks! They provide natural sugars for energy, fiber for digestion, and essential minerals. Our organic options have no preservatives or additives - just pure, natural goodness!",
    quickReplies: ['Organic products', 'Calorie information', 'Dietary restrictions', 'Best for athletes']
  },

  // Shipping and delivery
  'tell me about shipping': {
    message: "We offer multiple shipping options: Standard (5-7 days, FREE on orders $50+), Express (2-3 days, $8.99), and Same-day delivery in select cities ($15.99). All orders are carefully packed to preserve freshness!",
    quickReplies: ['Shipping costs', 'Delivery areas', 'Order tracking', 'Packaging details']
  },
  'shipping': {
    message: "Fast, reliable shipping is our priority! Free shipping on orders over $50, express options available, and we use special packaging to keep your dried fruits fresh during transit.",
    quickReplies: ['Free shipping details', 'Express delivery', 'International shipping', 'Package tracking']
  },

  // Product recommendations
  'product recommendations': {
    message: "I'd love to help you choose! What are you looking for? Sweet treats like dates and figs? Tart options like apricots? Or maybe a mixed variety for snacking? Tell me your preferences!",
    quickReplies: ['Sweet options', 'Tart fruits', 'Mixed varieties', 'Gift packages']
  },
  'help me choose': {
    message: "Great! To give you the best recommendations, what's your preference? Are you looking for: energy-boosting snacks, dessert alternatives, baking ingredients, or just daily healthy snacking?",
    quickReplies: ['Energy snacks', 'Dessert alternatives', 'Baking ingredients', 'Daily snacking']
  },

  // Specific products
  'tell me about dates': {
    message: "Dates are nature's candy! Our Premium Medjool dates are large, soft, and incredibly sweet. They're packed with potassium, fiber, and natural sugars. Perfect for energy boosts, desserts, or just satisfying sweet cravings naturally!",
    quickReplies: ['Medjool vs other dates', 'Date recipes', 'Nutritional facts', 'How to store dates']
  },
  'what about figs': {
    message: "Our Turkish dried figs are sun-dried to perfection! They have a honey-like sweetness with subtle floral notes. Rich in calcium, fiber, and antioxidants. Great for snacking, cheese boards, or adding to yogurt!",
    quickReplies: ['Fig varieties', 'Fig health benefits', 'Serving suggestions', 'Fig vs date comparison']
  },

  // Orders and account
  'track my order': {
    message: "To track your order, you can use your order number on our Track Order page, or check your email for tracking information. Orders typically ship within 1-2 business days!",
    quickReplies: ['Order tracking page', 'Shipping timeframes', 'Order status help', 'Contact support']
  },

  // Special offers
  'special offers': {
    message: "We have amazing deals right now! New customers get 20% off their first order, and we have seasonal discounts on bulk purchases. Plus, free shipping on orders over $50!",
    quickReplies: ['New customer discount', 'Bulk order discounts', 'Current promotions', 'How to apply codes']
  },

  // Payment and security
  'payment options': {
    message: "We accept all major credit cards, PayPal, and cash on delivery (COD) in select areas. All transactions are secure and encrypted for your safety. No stored payment information without your consent!",
    quickReplies: ['Credit cards accepted', 'PayPal checkout', 'Cash on delivery', 'Payment security']
  },

  // Default responses
  default: {
    message: "I'm here to help with any questions about our premium dried fruits! You can ask me about products, shipping, nutritional information, or anything else related to Aali Tigana.",
    quickReplies: ['Product catalog', 'Shipping info', 'Health benefits', 'Customer service']
  }
};

const keywords = {
  greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
  products: ['product', 'fruits', 'dried', 'dates', 'figs', 'apricots', 'raisins', 'mixed', 'organic'],
  health: ['healthy', 'nutrition', 'benefits', 'calories', 'sugar', 'organic', 'natural'],
  shipping: ['shipping', 'delivery', 'ship', 'deliver', 'track', 'order', 'fast'],
  payment: ['payment', 'pay', 'credit', 'card', 'paypal', 'cash', 'cod', 'secure'],
  offers: ['discount', 'offer', 'deal', 'promotion', 'sale', 'coupon', 'code'],
  help: ['help', 'support', 'assistance', 'question', 'problem', 'issue']
};

export const getChatbotResponse = (userMessage: string): ChatbotResponse => {
  const message = userMessage.toLowerCase().trim();

  // Direct matches
  if (responses[message]) {
    return responses[message];
  }

  // Keyword matching
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => message.includes(word))) {
      switch (category) {
        case 'greetings':
          return responses.hello;
        case 'products':
          if (message.includes('best') || message.includes('popular')) {
            return responses['show me best sellers'];
          }
          if (message.includes('dates')) {
            return responses['tell me about dates'];
          }
          if (message.includes('figs')) {
            return responses['what about figs'];
          }
          return {
            message: "We have an amazing selection of premium dried fruits! Dates, figs, apricots, raisins, and mixed varieties. Each category offers different flavors and nutritional benefits. What interests you most?",
            quickReplies: ['Show dates', 'Show figs', 'Show apricots', 'Show all products']
          };
        case 'health':
          return responses['i need healthy snacks'];
        case 'shipping':
          return responses['tell me about shipping'];
        case 'payment':
          return responses['payment options'];
        case 'offers':
          return responses['special offers'];
        case 'help':
          return {
            message: "I'm happy to help! I can assist with product information, nutritional benefits, shipping details, order tracking, payment options, and special offers. What would you like to know?",
            quickReplies: ['Product info', 'Nutritional facts', 'Shipping help', 'Order support']
          };
      }
    }
  }

  // Intent-based responses
  if (message.includes('recommend') || message.includes('suggest') || message.includes('choose')) {
    return responses['help me choose'];
  }

  if (message.includes('track') && message.includes('order')) {
    return responses['track my order'];
  }

  if (message.includes('organic') || message.includes('natural')) {
    return {
      message: "We have excellent organic options! Our Organic Turkish Apricots are certified organic with no sulfur or preservatives. Many of our products are naturally organic and free from artificial additives.",
      quickReplies: ['Organic products', 'Natural vs organic', 'Certification info', 'Health benefits']
    };
  }

  if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
    return {
      message: "Our prices reflect the premium quality of our dried fruits. We offer competitive pricing with frequent promotions. Plus, free shipping on orders over $50 makes it even more affordable!",
      quickReplies: ['Current prices', 'Free shipping details', 'Bulk discounts', 'Special offers']
    };
  }

  if (message.includes('fresh') || message.includes('quality')) {
    return {
      message: "Quality is our top priority! We source directly from premium growers, use optimal drying methods, and package for maximum freshness. Our products arrive as fresh as the day they were processed!",
      quickReplies: ['Quality standards', 'Sourcing info', 'Freshness guarantee', 'Storage tips']
    };
  }

  // Default response
  return responses.default;
};