const SUPABASE_URL = 'https://suyqbnmmsnbvyvowdueh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1eXFibm1tc25idnl2b3dkdWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDcxMzQsImV4cCI6MjA4OTE4MzEzNH0.4ggYMVhS31I74Eig4XfpOd_TAKl-Bb7Pzoic9zjIbeQ';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Redirige vers login si non connecté
async function requireAuth() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { window.location.href = '/login.html'; return null; }
  return session;
}

// Lit un paramètre dans l'URL (?id=xxx)
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Formate une date en français
function formatDate(d) {
  return d ? new Date(d + 'T00:00:00').toLocaleDateString('fr-FR') : '';
}

// Calcule l'âge en années et mois
function calcAge(dateNaissance) {
  const n = new Date(dateNaissance), t = new Date();
  let annees = t.getFullYear() - n.getFullYear();
  let mois = t.getMonth() - n.getMonth();
  if (t.getDate() < n.getDate()) mois--;
  if (mois < 0) { annees--; mois += 12; }
  return { annees, mois, str: `${annees} ans ${mois} mois` };
}

// Affiche un message d'erreur
function showError(msg) {
  const el = document.getElementById('error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}

// Affiche un message de succès
function showSuccess(msg) {
  const el = document.getElementById('success');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
