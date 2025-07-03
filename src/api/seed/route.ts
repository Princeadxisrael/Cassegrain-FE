import { NextResponse } from 'next/server';
import { db } from '../../utils/firebaseConfig';
import { collection, doc, writeBatch } from 'firebase/firestore';

// ran once to create records in DB with dummy data

const allProducts = [
    {
        "product_id": "prod_lap_001", "product_type": "laptop", "owner_name": "Dell", "location": "Texas Factory", "price": 1299.99, "status": "manufactured", "timestamp": "2025-01-15T10:00:00Z", "metadata_ipfs": "QmLap001",
        "cpu": "Intel Core i7-13700H", "ram": "16GB DDR5", "gpu": "NVIDIA RTX 4060", "storage": "1TB NVMe SSD", "screen_size": "15.6 inch", "warranty": "2 years"
    },
    {
        "product_id": "prod_lap_002", "product_type": "laptop", "owner_name": "Apple", "location": "Cupertino HQ", "price": 1999.99, "status": "shipped", "timestamp": "2025-01-20T11:30:00Z", "metadata_ipfs": "QmLap002",
        "cpu": "Apple M3 Pro", "ram": "18GB", "gpu": "integrated", "storage": "512GB SSD", "screen_size": "14 inch", "warranty": "1 year"
    },
    {
        "product_id": "prod_lap_003", "product_type": "laptop", "owner_name": "HP", "location": "Shanghai Plant", "price": 899.50, "status": "in_transit", "timestamp": "2025-02-01T08:45:00Z", "metadata_ipfs": "QmLap003",
        "cpu": "AMD Ryzen 7 7840HS", "ram": "16GB DDR5", "gpu": "AMD Radeon 780M", "storage": "512GB NVMe SSD", "screen_size": "16 inch", "warranty": "1 year"
    },
    {
        "product_id": "prod_lap_004", "product_type": "laptop", "owner_name": "Lenovo", "location": "Shenzhen Factory", "price": 1450.00, "status": "delivered", "timestamp": "2025-02-10T14:00:00Z", "metadata_ipfs": "QmLap004",
        "cpu": "Intel Core i9-13900HX", "ram": "32GB DDR5", "gpu": "NVIDIA RTX 4070", "storage": "2TB NVMe SSD", "screen_size": "16 inch", "warranty": "3 years"
    },
    {
        "product_id": "prod_lap_005", "product_type": "laptop", "owner_name": "Asus", "location": "Taiwan Assembly", "price": 1699.00, "status": "manufactured", "timestamp": "2025-02-15T18:20:00Z", "metadata_ipfs": "QmLap005",
        "cpu": "Intel Core Ultra 7", "ram": "16GB LPDDR5X", "gpu": "Intel Arc Graphics", "storage": "1TB NVMe SSD", "screen_size": "14 inch OLED", "warranty": "1 year"
    },
    {
        "product_id": "prod_lap_006", "product_type": "laptop", "owner_name": "Microsoft", "location": "Redmond Port", "price": 1199.00, "status": "in_store", "timestamp": "2025-03-01T09:00:00Z", "metadata_ipfs": "QmLap006",
        "cpu": "Intel Core i5-1245U", "ram": "8GB LPDDR5", "gpu": "integrated", "storage": "256GB SSD", "screen_size": "13.5 inch", "warranty": "1 year"
    },
    {
        "product_id": "prod_lap_007", "product_type": "laptop", "owner_name": "Razer", "location": "Singapore Hub", "price": 2499.99, "status": "shipped", "timestamp": "2025-03-05T22:10:00Z", "metadata_ipfs": "QmLap007",
        "cpu": "Intel Core i9-14900HX", "ram": "32GB DDR5", "gpu": "NVIDIA RTX 4080", "storage": "1TB NVMe SSD", "screen_size": "17 inch QHD", "warranty": "2 years"
    },
    {
        "product_id": "prod_lap_008", "product_type": "laptop", "owner_name": "Samsung", "location": "Seoul Factory", "price": 1349.00, "status": "manufactured", "timestamp": "2025-03-10T13:00:00Z", "metadata_ipfs": "QmLap008",
        "cpu": "Intel Core Ultra 9", "ram": "32GB LPDDR5X", "gpu": "NVIDIA RTX 3050", "storage": "1TB NVMe SSD", "screen_size": "16 inch AMOLED", "warranty": "2 years"
    },
    {
        "product_id": "prod_lap_009", "product_type": "laptop", "owner_name": "Acer", "location": "Chongqing Factory", "price": 799.00, "status": "in_transit", "timestamp": "2025-03-12T04:30:00Z", "metadata_ipfs": "QmLap009",
        "cpu": "AMD Ryzen 5 7530U", "ram": "8GB DDR4", "gpu": "integrated", "storage": "512GB SSD", "screen_size": "15.6 inch", "warranty": "1 year"
    },
    {
        "product_id": "prod_lap_010", "product_type": "laptop", "owner_name": "Apple", "location": "Cupertino HQ", "price": 2499.00, "status": "delivered", "timestamp": "2025-03-20T16:45:00Z", "metadata_ipfs": "QmLap010",
        "cpu": "Apple M3 Max", "ram": "36GB", "gpu": "integrated", "storage": "1TB SSD", "screen_size": "16 inch", "warranty": "1 year"
    },
    
    // 10 Shoes
    {
        "product_id": "prod_shoe_001", "product_type": "shoes", "owner_name": "Nike", "location": "Vietnam Factory", "price": 180.00, "status": "shipped", "timestamp": "2025-04-01T07:00:00Z", "metadata_ipfs": "QmShoe001",
        "material": "Flyknit Mesh", "size": "UK 10", "color": "Volt Green", "model_code": "NK-AF1-2025", "manufactured_location": "Ho Chi Minh City"
    },
    {
        "product_id": "prod_shoe_002", "product_type": "shoes", "owner_name": "Adidas", "location": "Indonesia Plant", "price": 150.00, "status": "in_store", "timestamp": "2025-04-05T12:00:00Z", "metadata_ipfs": "QmShoe002",
        "material": "Primeknit", "size": "UK 8", "color": "Core Black", "model_code": "AD-UB-2025", "manufactured_location": "Jakarta"
    },
    {
        "product_id": "prod_shoe_003", "product_type": "shoes", "owner_name": "Louis Vuitton", "location": "Italy Workshop", "price": 950.00, "status": "manufactured", "timestamp": "2025-04-10T15:30:00Z", "metadata_ipfs": "QmShoe003",
        "material": "Genuine Calf Leather", "size": "UK 9", "color": "Brown Monogram", "model_code": "LV-TRN-2024", "manufactured_location": "Fiesso d'Artico"
    },
    {
        "product_id": "prod_shoe_004", "product_type": "shoes", "owner_name": "Puma", "location": "Bangladesh Factory", "price": 90.00, "status": "delivered", "timestamp": "2025-04-12T11:20:00Z", "metadata_ipfs": "QmShoe004",
        "material": "Suede", "size": "UK 11", "color": "Navy Blue", "model_code": "PM-SD-CLASSIC", "manufactured_location": "Dhaka"
    },
    {
        "product_id": "prod_shoe_005", "product_type": "shoes", "owner_name": "New Balance", "location": "USA Factory", "price": 210.00, "status": "shipped", "timestamp": "2025-04-15T19:00:00Z", "metadata_ipfs": "QmShoe005",
        "material": "Pigskin/Mesh", "size": "UK 9.5", "color": "Grey", "model_code": "NB-990V6-US", "manufactured_location": "Lawrence, MA"
    },
    {
        "product_id": "prod_shoe_006", "product_type": "shoes", "owner_name": "Gucci", "location": "Milan Store", "price": 890.00, "status": "in_store", "timestamp": "2025-04-20T10:00:00Z", "metadata_ipfs": "QmShoe006",
        "material": "Canvas and Leather", "size": "UK 7", "color": "Beige/Ebony", "model_code": "GC-ACE-2025", "manufactured_location": "Florence"
    },
    {
        "product_id": "prod_shoe_007", "product_type": "shoes", "owner_name": "Reebok", "location": "Vietnam Factory", "price": 110.00, "status": "in_transit", "timestamp": "2025-04-22T03:15:00Z", "metadata_ipfs": "QmShoe007",
        "material": "Leather", "size": "UK 8.5", "color": "White/Gum", "model_code": "RBK-CLUB-C85", "manufactured_location": "Hanoi"
    },
    {
        "product_id": "prod_shoe_008", "product_type": "shoes", "owner_name": "Converse", "location": "India Plant", "price": 75.00, "status": "manufactured", "timestamp": "2025-04-25T14:45:00Z", "metadata_ipfs": "QmShoe008",
        "material": "Canvas", "size": "UK 10", "color": "Black", "model_code": "CON-CT-70-HI", "manufactured_location": "Bangalore Factory"
    },
    {
        "product_id": "prod_shoe_009", "product_type": "shoes", "owner_name": "Vans", "location": "California Port", "price": 85.00, "status": "shipped", "timestamp": "2025-05-01T09:30:00Z", "metadata_ipfs": "QmShoe009",
        "material": "Suede/Canvas", "size": "UK 9", "color": "Checkerboard", "model_code": "VNS-SLIPON-CHK", "manufactured_location": "Cambodia"
    },
    {
        "product_id": "prod_shoe_010", "product_type": "shoes", "owner_name": "Dr. Martens", "location": "UK Warehouse", "price": 190.00, "status": "delivered", "timestamp": "2025-05-05T13:00:00Z", "metadata_ipfs": "QmShoe010",
        "material": "Smooth Leather", "size": "UK 8", "color": "Cherry Red", "model_code": "DM-1460-RED", "manufactured_location": "Northamptonshire"
    },

    // 10 Medicines
    {
        "product_id": "prod_med_001", "product_type": "medicine", "owner_name": "Cipla", "location": "Mumbai Plant", "price": 2.50, "status": "manufactured", "timestamp": "2025-05-10T06:00:00Z", "metadata_ipfs": "QmMed001",
        "batch_number": "BN240123", "expiry_date": "2026-05-01", "recommended_dosage": "500mg", "salt_composition": "Paracetamol", "temperature_stored": "8°C", "batch_quality_check": "pass"
    },
    {
        "product_id": "prod_med_002", "product_type": "medicine", "owner_name": "Sun Pharma", "location": "Gujarat Factory", "price": 3.00, "status": "shipped", "timestamp": "2025-05-12T09:20:00Z", "metadata_ipfs": "QmMed002",
        "batch_number": "BN240124", "expiry_date": "2027-01-01", "recommended_dosage": "400mg", "salt_composition": "Ibuprofen", "temperature_stored": "10°C", "batch_quality_check": "pass"
    },
    {
        "product_id": "prod_med_003", "product_type": "medicine", "owner_name": "Pfizer", "location": "Ireland Plant", "price": 15.00, "status": "in_transit", "timestamp": "2025-05-15T18:00:00Z", "metadata_ipfs": "QmMed003",
        "batch_number": "BN240125", "expiry_date": "2026-11-01", "recommended_dosage": "10mg", "salt_composition": "Atorvastatin", "temperature_stored": "15°C", "batch_quality_check": "pass"
    },
    {
        "product_id": "prod_med_004", "product_type": "medicine", "owner_name": "Dr. Reddy's", "location": "Hyderabad R&D", "price": 1.50, "status": "delivered", "timestamp": "2025-05-20T11:00:00Z", "metadata_ipfs": "QmMed004",
        "batch_number": "BN240126", "expiry_date": "2025-12-01", "recommended_dosage": "100mg", "salt_composition": "Metformin", "temperature_stored": "12°C", "batch_quality_check": "pass"
    },
    {
        "product_id": "prod_med_005", "product_type": "medicine", "owner_name": "GSK", "location": "UK Distribution", "price": 25.00, "status": "in_store", "timestamp": "2025-05-25T10:00:00Z", "metadata_ipfs": "QmMed005",
        "batch_number": "BN240127", "expiry_date": "2027-08-01", "recommended_dosage": "20mg", "salt_composition": "Omeprazole", "temperature_stored": "20°C", "batch_quality_check": "pass"
    },
    {
        "product_id": "prod_med_006", "product_type": "medicine", "owner_name": "Cipla", "location": "Mumbai Plant", "price": 2.50, "status": "recalled", "timestamp": "2025-05-26T14:00:00Z", "metadata_ipfs": "QmMed006",
        "batch_number": "BN240128", "expiry_date": "2026-05-01", "recommended_dosage": "500mg", "salt_composition": "Paracetamol", "temperature_stored": "9°C", "batch_quality_check": "fail"
    },
    {
        "product_id": "prod_med_007", "product_type": "medicine", "owner_name": "Novartis", "location": "Swiss Factory", "price": 55.00, "status": "manufactured", "timestamp": "2025-06-01T08:30:00Z", "metadata_ipfs": "QmMed007",
        "batch_number": "BN240129", "expiry_date": "2028-02-01", "recommended_dosage": "50mg", "salt_composition": "Losartan", "temperature_stored": "18°C", "batch_quality_check": "pass"
    },
    {
        "product_id": "prod_med_008", "product_type": "medicine", "owner_name": "Roche", "location": "German Hub", "price": 120.00, "status": "shipped", "timestamp": "2025-06-05T12:00:00Z", "metadata_ipfs": "QmMed008",
        "batch_number": "BN240130", "expiry_date": "2027-10-01", "recommended_dosage": "5mg", "salt_composition": "Amlodipine", "temperature_stored": "15°C", "batch_quality_check": "pass"
    },
    {
        "product_id": "prod_med_009", "product_type": "medicine", "owner_name": "Lupin", "location": "Goa Plant", "price": 4.00, "status": "delivered", "timestamp": "2025-06-10T16:00:00Z", "metadata_ipfs": "QmMed009",
        "batch_number": "BN240131", "expiry_date": "2026-09-01", "recommended_dosage": "25mg", "salt_composition": "Metoprolol", "temperature_stored": "14°C", "batch_quality_check": "pass"
    },
    {
        "product_id": "prod_med_010", "product_type": "medicine", "owner_name": "AstraZeneca", "location": "Sweden R&D", "price": 8.00, "status": "in_store", "timestamp": "2025-06-15T10:45:00Z", "metadata_ipfs": "QmMed010",
        "batch_number": "BN240132", "expiry_date": "2027-04-01", "recommended_dosage": "75mg", "salt_composition": "Aspirin", "temperature_stored": "22°C", "batch_quality_check": "pass"
    }
];

export async function POST() {
  const batch = writeBatch(db);
  const productsCollectionRef = collection(db, 'products');

  allProducts.forEach((product) => {
    const docRef = doc(productsCollectionRef, product.product_id);
    batch.set(docRef, product);
  });

  try {
    await batch.commit();
    console.log('Successfully seeded database!');
    return NextResponse.json({
      success: true,
      message: `Successfully seeded database with ${allProducts.length} products.`,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to seed database.', error: (error as Error).message },
      { status: 500 }
    );
  }
}