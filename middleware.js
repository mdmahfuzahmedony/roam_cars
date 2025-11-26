import { NextResponse } from 'next/server';

export function middleware(request) {
  

  const token = request.cookies.get('__next_hmr_refresh_hash__')?.value;


  if (!token) {
    return NextResponse.redirect(new URL('/loginpage', request.url));
  }
  

}

export const config = {
  matcher: [
    "/manages_product",
    "/add-product"      
  ],
};