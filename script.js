const form = document.getElementById('listingForm');
const loadSampleButton = document.getElementById('loadSample');
const submitStatus = document.getElementById('submitStatus');

const shippingForm = document.getElementById('shippingForm');
const fromIslandInput = document.getElementById('fromIsland');
const toIslandInput = document.getElementById('toIsland');
const weightKgInput = document.getElementById('weightKg');
const shippingMethodInput = document.getElementById('shippingMethod');
const urgencyInput = document.getElementById('urgency');
const shippingCost = document.getElementById('shippingCost');
const bestRoute = document.getElementById('bestRoute');
const shippingNotes = document.getElementById('shippingNotes');

const productInput = document.getElementById('productName');
const categoryInput = document.getElementById('category');
const conditionInput = document.getElementById('condition');
const locationInput = document.getElementById('location');
const targetPriceInput = document.getElementById('targetPrice');
const ageInput = document.getElementById('age');
const deliveryInput = document.getElementById('delivery');
const notesInput = document.getElementById('notes');

const listingTitle = document.getElementById('listingTitle');
const listingDescription = document.getElementById('listingDescription');
const suggestedPrice = document.getElementById('suggestedPrice');
const sellingAngle = document.getElementById('sellingAngle');
const deliveryPlan = document.getElementById('deliveryPlan');
const trustNotes = document.getElementById('trustNotes');
const marketPulse = document.getElementById('marketPulse');

const API_URL = window.KIRILIST_API_URL || 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_WEB_APP_ID/exec';

const recentListingsTable = document.getElementById('recentListingsTable');
const recentRoutesTable = document.getElementById('recentRoutesTable');
const statListings = document.getElementById('statListings');
const statAveragePrice = document.getElementById('statAveragePrice');
const statRoutes = document.getElementById('statRoutes');
const statPickupRate = document.getElementById('statPickupRate');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
}

function getCategoryMultiplier(category) {
  const multipliers = {
    'Home & Living': 0.8,
    'Electronics': 0.72,
    'Vehicles': 1.15,
    'Agriculture': 0.88,
    'Fashion': 0.7,
    'Services': 0.9,
  };
  return multipliers[category] || 0.8;
}

function getConditionAdjustment(condition) {
  const map = {
    'New': 1.2,
    'Like new': 1.08,
    'Good': 0.92,
    'Fair': 0.75,
    'Needs repair': 0.5,
  };
  return map[condition] || 1;
}

function getDemandBoost(location) {
  const boosts = {
    'South Tarawa': 1.18,
    'Tarawa': 1.12,
    'Betio': 1.15,
    'Kiritimati': 1.1,
    'Outer island': 0.9,
  };
  return boosts[location] || 1;
}

function generateListingPayload() {
  const productName = productInput.value.trim() || 'Item';
  const category = categoryInput.value;
  const condition = conditionInput.value;
  const location = locationInput.value;
  const targetPrice = Number(targetPriceInput.value) || 0;
  const age = ageInput.value;
  const delivery = deliveryInput.value;
  const notes = notesInput.value.trim() || 'No extras added.';

  const baseValue = Math.max(40, targetPrice * 0.85);
  const price = Math.round(baseValue * getCategoryMultiplier(category) * getConditionAdjustment(condition) * getDemandBoost(location));
  const suggested = Math.max(25, Math.min(price, targetPrice * 1.5));

  const shortTitle = `${productName} in ${location}`;
  const description = `Looking for a new home for a ${condition.toLowerCase()} ${productName.toLowerCase()} in ${location}. This item has been used for ${age.toLowerCase()} and is suitable for buyers who want a practical option without paying full retail pricing. ${notes}. Delivery option: ${delivery.toLowerCase()}.`;

  const sellingAngleText = `Emphasize value, condition, and fast local pickup in ${location}.`;

  const deliverySuggestions = {
    'Pickup only': `Recommend pickup in ${location} with a clear meeting time and a short inspection window before payment.`,
    'Local delivery': `Offer a small delivery fee within ${location} to increase trust and speed up sales.`,
    'Island freight': `Use a simple freight quote and include cargo handling expectations before the buyer agrees to purchase.`,
    'Courier or boat': `State the transport cost separately so the buyer can compare options and avoid pricing disputes.`,
  };

  const trustItems = [
    'Clear photos from multiple angles and a close-up of the condition',
    'Mention any defects in plain language to avoid disputes',
    "Set a response window such as 'reply within 12 hours'",
    'Give a clean pickup or delivery option with a fixed location',
  ];

  let marketStatus = 'Strong interest';
  if (suggested > targetPrice * 1.25) {
    marketStatus = 'Premium pricing';
  } else if (suggested < targetPrice * 0.8) {
    marketStatus = 'Value-focused';
  }

  return {
    title: shortTitle,
    description,
    price: suggested,
    sellingAngleText,
    deliveryText: deliverySuggestions[delivery] || deliverySuggestions['Pickup only'],
    trustItems,
    marketStatus,
  };
}

function renderListing() {
  const payload = generateListingPayload();

  listingTitle.textContent = payload.title;
  listingDescription.textContent = payload.description;
  suggestedPrice.textContent = formatCurrency(payload.price);
  sellingAngle.textContent = payload.sellingAngleText;
  deliveryPlan.textContent = payload.deliveryText;
  marketPulse.textContent = payload.marketStatus;

  trustNotes.innerHTML = '';
  payload.trustItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    trustNotes.appendChild(li);
  });
}

function renderDashboard() {
  const sampleListings = [
    { name: 'Used refrigerator', location: 'South Tarawa', price: 420 },
    { name: 'Solar freezer', location: 'Betio', price: 650 },
    { name: 'Mountain bike', location: 'Tarawa', price: 320 },
  ];

  const sampleRoutes = [
    { route: 'South Tarawa → Betio', method: 'Local boat', total: 140 },
    { route: 'Tarawa → Kiritimati', method: 'Freight service', total: 260 },
    { route: 'Betio → South Tarawa', method: 'Courier', total: 170 },
  ];

  const totalPrice = sampleListings.reduce((sum, item) => sum + item.price, 0);
  const avgPrice = Math.round(totalPrice / sampleListings.length);

  if (statListings) statListings.textContent = String(sampleListings.length);
  if (statAveragePrice) statAveragePrice.textContent = formatCurrency(avgPrice);
  if (statRoutes) statRoutes.textContent = String(sampleRoutes.length);
  if (statPickupRate) statPickupRate.textContent = '72%';

  if (recentListingsTable) {
    recentListingsTable.innerHTML = sampleListings.map((item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.location}</td>
        <td>${formatCurrency(item.price)}</td>
      </tr>
    `).join('');
  }

  if (recentRoutesTable) {
    recentRoutesTable.innerHTML = sampleRoutes.map((item) => `
      <tr>
        <td>${item.route}</td>
        <td>${item.method}</td>
        <td>${formatCurrency(item.total)}</td>
      </tr>
    `).join('');
  }
}

function calculateShippingEstimate() {
  const from = fromIslandInput.value;
  const to = toIslandInput.value;
  const weight = Number(weightKgInput.value) || 1;
  const method = shippingMethodInput.value;
  const urgency = urgencyInput.value;

  const baseMap = {
    'South Tarawa': 12,
    'Tarawa': 10,
    'Betio': 15,
    'Kiritimati': 24,
    'Outer island': 18,
  };

  const distanceMult = {
    'South Tarawa': 1,
    'Tarawa': 1.1,
    'Betio': 1.25,
    'Kiritimati': 2.4,
    'Outer island': 2.1,
  };

  const methodMult = {
    'Local boat': 1,
    'Freight service': 1.45,
    'Courier': 1.8,
    'Pickup': 0.6,
  };

  const urgencyMult = {
    'Standard': 1,
    'Priority': 1.35,
    'Weekend dispatch': 1.2,
  };

  const routeCost = baseMap[from] * distanceMult[to] * methodMult[method] * urgencyMult[urgency] * (1 + Math.max(0, weight - 1) * 0.12);
  const total = Math.round(routeCost);

  const routeLabel = from === to ? 'Same-island transfer' : `${from} → ${to}`;

  const notes = [
    `Recommended method: ${method}.`,
    `Weight factor: ${weight} kg.`,
    urgency === 'Priority' ? 'Priority handling may require early booking.' : 'Standard timing is usually sufficient for local delivery.',
    from === to ? 'For same-island moves, pickup coordination is usually the cheapest and fastest.' : 'Check whether the buyer is able to collect from a central dock or roadside point.'
  ];

  return {
    cost: total,
    routeLabel,
    notes,
  };
}

function renderShippingEstimate() {
  if (!shippingCost || !bestRoute || !shippingNotes) return;

  const estimate = calculateShippingEstimate();
  shippingCost.textContent = formatCurrency(estimate.cost);
  bestRoute.textContent = `${estimate.routeLabel} via ${shippingMethodInput.value.toLowerCase()}.`;

  shippingNotes.innerHTML = '';
  estimate.notes.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    shippingNotes.appendChild(li);
  });
}

function setSubmitState(message, type) {
  if (!submitStatus) return;
  submitStatus.textContent = message;
  submitStatus.className = 'submit-status';
  if (type === 'success') submitStatus.classList.add('success');
  if (type === 'error') submitStatus.classList.add('error');
}

async function submitListingToBackend() {
  const payload = generateListingPayload();
  const requestBody = {
    productName: productInput.value,
    category: categoryInput.value,
    condition: conditionInput.value,
    location: locationInput.value,
    targetPrice: targetPriceInput.value,
    age: ageInput.value,
    delivery: deliveryInput.value,
    notes: notesInput.value,
    listingTitle: payload.title,
    listingDescription: payload.description,
    suggestedPrice: payload.price,
    marketStatus: payload.marketStatus,
  };

  setSubmitState('Saving listing...', '');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    if (result && result.success) {
      setSubmitState('Listing saved successfully.', 'success');
      return;
    }

    throw new Error(result && result.error ? result.error : 'Unknown backend error');
  } catch (error) {
    console.error(error);
    setSubmitState('Could not save listing. Check the Apps Script URL and deployment.', 'error');
  }
}

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    renderListing();
    await submitListingToBackend();
  });
}

if (loadSampleButton) {
  loadSampleButton.addEventListener('click', () => {
    productInput.value = 'Solar freezer';
    categoryInput.value = 'Electronics';
    conditionInput.value = 'Good';
    locationInput.value = 'South Tarawa';
    targetPriceInput.value = '650';
    ageInput.value = '6-18 months';
    deliveryInput.value = 'Local delivery';
    notesInput.value = 'Runs efficiently, no power issues, buyer can inspect in Bikenibeu before payment.';
    renderListing();
  });
}

if (shippingForm) {
  shippingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderShippingEstimate();
  });

  [fromIslandInput, toIslandInput, weightKgInput, shippingMethodInput, urgencyInput].forEach((input) => {
    input.addEventListener('input', renderShippingEstimate);
    input.addEventListener('change', renderShippingEstimate);
  });
}

renderListing();
renderDashboard();
renderShippingEstimate();
