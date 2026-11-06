# Configuration pour Vercel Blob Storage

## Étapes pour configurer Vercel Blob Storage

### 1. Créer un compte Blob Storage
```bash
npx vercel blob init
```

### 2. Obtenir le token d'accès
- Allez dans votre dashboard Vercel
- Section "Storage" → "Blob Storage"
- Créez un nouveau store
- Copiez le `BLOB_READ_WRITE_TOKEN`

### 3. Configurer les variables d'environnement
Dans votre dashboard Vercel, ajoutez ces variables d'environnement :

```
BLOB_READ_WRITE_TOKEN=your_blob_token_here
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

### 4. En local
Créez un fichier `.env.local` à la racine du projet :

```
BLOB_READ_WRITE_TOKEN=your_blob_token_here
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

### 5. Redéploiement
Après avoir configuré les variables d'environnement, redéployez :

```bash
npx vercel --prod
```

## Architecture finale

```
Client (AdhesionForm)
    ↓ (FormData + fichiers)
API Route (/api/adhesion)
    ↓ (uploadFile())
Vercel Blob Storage
    ↓ (URL publique)
Neon Database (stocke l'URL)
    ↓
Page /adherents (affiche les liens)
```

## Avantages de Vercel Blob

✅ **Performance** : CDN intégré
✅ **Simplicité** : Pas de configuration serveur
✅ **Scalabilité** : Gère automatiquement la charge
✅ **Sécurité** : URLs publiques avec token
✅ **Coût** : Pay-as-you-go, généreux quota gratuit
