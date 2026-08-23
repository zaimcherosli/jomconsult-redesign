import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        puncaReject: resolve(__dirname, 'punca-reject.html'),
        servis: resolve(__dirname, 'servis.html'),
        kalkulator: resolve(__dirname, 'kalkulator.html'),
        caraKerja: resolve(__dirname, 'cara-kerja.html'),
        testimoni: resolve(__dirname, 'testimoni.html'),
        verify: resolve(__dirname, 'verify.html'),
        faq: resolve(__dirname, 'faq.html'),
        contact: resolve(__dirname, 'contact.html'),
        tentangKami: resolve(__dirname, 'tentang-kami.html'),
        pasukan: resolve(__dirname, 'pasukan.html'),
        kerjaya: resolve(__dirname, 'kerjaya.html'),
        admin: resolve(__dirname, 'admin.html'),
      }
    }
  }
});
