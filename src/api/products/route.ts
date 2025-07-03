import { NextResponse } from 'next/server';
import { db } from '../../utils/firebaseConfig';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  const productsCollectionRef = collection(db, 'products');
  let q = query(productsCollectionRef); // Base query

  if (type) {
    q = query(productsCollectionRef, where("product_type", "==", type.toLowerCase()));
  }

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map(doc => doc.data());

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_id, ...updateData } = body;

    if (!product_id) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required in the request body.' },
        { status: 400 } // Bad Request
      );
    }

    const docRef = doc(db, 'products', product_id);

    await setDoc(docRef, updateData, { merge: true });

    console.log(`Successfully updated/created product: ${product_id}`);
    return NextResponse.json(
      { success: true, message: `Product ${product_id} updated successfully.` },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update product.', error: (error as Error).message },
      { status: 500 }
    );
  }
}