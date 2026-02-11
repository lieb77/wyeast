import { NodeOAuthClient } from '@atproto/oauth-client-node';
import { JoseKey } from '@atproto/jwk-jose';

async function run() {
    console.log(`🚀 Testing on Node ${process.version}`);
try { 
    const client = new NodeOAuthClient({
  clientMetadata: {
   
      client_id: 'https://bsky.paullieberman.net/client-metadata.json',
      client_name: 'Flashes',
      client_uri: 'https://bsky.paullieberman.net',
      redirect_uris: ['https://bsky.paullieberman.net/api/oauth/callback'],
      grant_types: ['authorization_code', 'refresh_token'],
      scope: 'atproto transition:generic',
      response_types: ['code'],
      application_type: 'web',
      },

      stateStore: new Map(),
      sessionStore: new Map(),
    });

    console.log("✅ SUCCESS: Client initialized!");

    // Test a real call
    const url = await client.authorize('atproto.com');
    console.log("🔗 Auth URL generated:", url.toString().substring(0, 50) + "...");

  } catch (e) {
    console.error("❌ Test Failed:", e);

    if (e.message.includes('bind')) {
      console.log("\n⚠️ Node 24 is still blocking the internal .bind() call.");
      console.log("Try running node with: --experimental-global-webcrypto");
    }
  }
}
run();
