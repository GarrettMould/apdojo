export async function POST(req: Request) {
  return new Response(JSON.stringify({ message: 'Payment system coming soon' }), {
    status: 200,
  });
}
