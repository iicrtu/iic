import { useQuery } from '@tanstack/react-query';

const API = import.meta.env.VITE_API_URL;

/* ── generic fetcher ──────────────────────────────────── */
const fetchJson = async (url, opts = {}) => {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

const authFetch = (url) =>
  fetchJson(url, { credentials: 'include', cache: 'no-cache' });

/* ── public hooks ─────────────────────────────────────── */

/** GET /api/announcements — returns { announcements } */
export const useAnnouncements = () =>
  useQuery({
    queryKey: ['announcements'],
    queryFn: () => fetchJson(`${API}/api/announcements`),
    staleTime: 5 * 60 * 1000, // 5 min
    select: (data) => data.announcements || [],
  });

/** GET /api/internships/public — returns { internships, totalPages } */
export const usePublicInternships = (params = {}) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') sp.set(k, v);
  });
  const qs = sp.toString();

  return useQuery({
    queryKey: ['publicInternships', qs],
    queryFn: () => fetchJson(`${API}/api/internships/public?${qs}`),
    staleTime: 2 * 60 * 1000, // 2 min
  });
};

/* ── authenticated hooks ──────────────────────────────── */

/** GET /api/student/profile — returns { student } */
export const useStudentProfile = (enabled = true) =>
  useQuery({
    queryKey: ['studentProfile'],
    queryFn: () => authFetch(`${API}/api/student/profile`),
    enabled,
    select: (data) => data.student,
  });

/** GET /api/organization/profile — returns { organization } */
export const useOrgProfile = (enabled = true) =>
  useQuery({
    queryKey: ['orgProfile'],
    queryFn: () => authFetch(`${API}/api/organization/profile`),
    enabled,
    select: (data) => data.organization,
  });

/** GET /api/applications/mine — returns { applications } */
export const useMyApplications = (enabled = true) =>
  useQuery({
    queryKey: ['myApplications'],
    queryFn: () => authFetch(`${API}/api/applications/mine`),
    enabled,
    select: (data) => data.applications || [],
  });

/** GET /api/internships (org's own) — returns { internships } */
export const useOrgInternships = (enabled = true) =>
  useQuery({
    queryKey: ['orgInternships'],
    queryFn: () => authFetch(`${API}/api/internships`),
    enabled,
    select: (data) => data.internships || [],
  });
