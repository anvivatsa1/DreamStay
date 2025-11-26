import React, { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaHotel,
  FaMinus,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

/* ==========================
   Lightbox component
   - images: array of src
   - startIndex: initial image index
   - onClose: close handler
   ========================== */
function Lightbox({ images = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex || 0);
  const [zoomed, setZoomed] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setIndex(startIndex || 0);
  }, [startIndex]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setIndex((i) => Math.min(images.length - 1, i + 1));
      if (e.key === "+" || e.key === "=") setZoomed(true);
      if (e.key === "-") setZoomed(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  useEffect(() => setZoomed(false), [index]);

  if (!images || images.length === 0) return null;
  const src = images[index];

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(images.length - 1, i + 1));

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          right: 18,
          top: 18,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "white",
          borderRadius: 8,
          padding: "8px 10px",
          cursor: "pointer",
        }}
      >
        <FaTimes />
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: 12,
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: 28,
            cursor: "pointer",
          }}
        >
          <FaChevronLeft />
        </button>
      )}

      <div
        style={{
          maxWidth: "92%",
          maxHeight: "92%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={`Image ${index + 1}`}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed((z) => !z);
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='480'%3E%3Crect width='100%25' height='100%25' fill='%232a2f36'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23c7c7c7' font-size='20'%3EPhoto unavailable%3C/text%3E%3C/svg%3E";
          }}
          draggable={false}
          style={{
            display: "block",
            maxWidth: zoomed ? "none" : "100%",
            maxHeight: zoomed ? "none" : "100%",
            width: zoomed ? "auto" : "100%",
            height: zoomed ? "auto" : "100%",
            transform: zoomed ? "scale(2)" : "none",
            transition: "transform 240ms ease",
            cursor: zoomed ? "grab" : "zoom-in",
            userSelect: "none",
          }}
        />
      </div>

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next"
          style={{
            position: "absolute",
            right: 12,
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: 28,
            cursor: "pointer",
          }}
        >
          <FaChevronRight />
        </button>
      )}

      <div style={{ position: "absolute", bottom: 18, color: "white", fontSize: 13 }}>
        {index + 1} / {images.length} {zoomed ? " • zoomed (click image to toggle)" : ""}
      </div>
    </div>
  );
}

/* ==========================
   BillModal - printable aesthetic bill
   props: bill, onClose
   ========================== */
function BillModal({ bill, onClose }) {
  if (!bill) return null;

  const fmt = (n) =>
    Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const created = new Date(bill.createdAt);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4,6,12,0.45)",
        zIndex: 6000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: 720,
          maxWidth: "98%",
          background: "white",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 30px 60px rgba(2,6,23,0.18)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            right: 14,
            top: 14,
            background: "transparent",
            border: "1px solid rgba(11,18,32,0.06)",
            color: "#0b1220",
            borderRadius: 8,
            padding: "6px 8px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0b1220" }}>DreamStay Hotels</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>Aesthetic Receipt</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Bill ID</div>
            <div style={{ color: "#6b7280", marginTop: 6 }}>{bill.id}</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>{created.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ borderTop: "1px dashed #e6e9ef", paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>Guest</div>
              <div style={{ fontWeight: 700 }}>{bill.ownerName}</div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>{bill.ownerEmail}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "#6b7280" }}>Room</div>
              <div style={{ fontWeight: 700 }}>{bill.roomName}</div>
              <div style={{ color: "#6b7280", fontSize: 13 }}>
                {bill.checkIn} → {bill.checkOut} ({bill.nights} night{bill.nights > 1 ? "s" : ""})
              </div>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "10px 8px", color: "#6b7280", fontSize: 13 }}>Description</th>
                <th style={{ textAlign: "right", padding: "10px 8px", color: "#6b7280", fontSize: 13 }}>Qty</th>
                <th style={{ textAlign: "right", padding: "10px 8px", color: "#6b7280", fontSize: 13 }}>Rate</th>
                <th style={{ textAlign: "right", padding: "10px 8px", color: "#6b7280", fontSize: 13 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 8px", borderTop: "1px solid #f1f5f9" }}>
                  {bill.roomName} (@ ₹{fmt(bill.pricePerNight)} / night)
                </td>
                <td style={{ padding: "10px 8px", textAlign: "right", borderTop: "1px solid #f1f5f9" }}>{bill.roomsBooked}</td>
                <td style={{ padding: "10px 8px", textAlign: "right", borderTop: "1px solid #f1f5f9" }}>₹{fmt(bill.pricePerNight)}</td>
                <td style={{ padding: "10px 8px", textAlign: "right", borderTop: "1px solid #f1f5f9" }}>₹{fmt(bill.subtotal)}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <div style={{ width: 280, background: "#fafafa", padding: 12, borderRadius: 8, border: "1px solid #eef2f6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ color: "#6b7280" }}>Subtotal</div>
                <div style={{ fontWeight: 700 }}>₹{fmt(bill.subtotal)}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ color: "#6b7280" }}>GST (5%)</div>
                <div style={{ fontWeight: 700 }}>₹{fmt(bill.gst)}</div>
              </div>
              <div style={{ height: 1, background: "#eef2f6", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 16 }}>
                <div>Total</div>
                <div>₹{fmt(bill.total)}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={() => window.print()}
            style={{
              background: "linear-gradient(90deg,#7c3aed,#4f46e5)",
              color: "white",
              padding: "10px 14px",
              borderRadius: 8,
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Print / Save PDF
          </button>
          <button
            onClick={onClose}
            style={{
              background: "#f3f4f6",
              color: "#111827",
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #e6e9ef",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================
   BookingModal
   ========================== */
function BookingModal({ room, available, onClose, onSubmit }) {
  const [formState, setFormState] = useState({ name: "", guestEmail: "", checkIn: "", checkOut: "", roomsBooked: 1 });

  useEffect(() => {
    setFormState({ name: "", guestEmail: "", checkIn: "", checkOut: "", roomsBooked: 1 });
  }, [room]);

  const setRoomsBooked = (v) => {
    const n = Math.max(1, Math.min(available || 1, Math.floor(Number(v) || 1)));
    setFormState((s) => ({ ...s, roomsBooked: n }));
  };

  if (!room) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4,6,12,0.45)",
        zIndex: 4000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: 680,
          maxWidth: "98%",
          background: "#ffffff",
          color: "#0b1220",
          borderRadius: 12,
          padding: 22,
          boxShadow: "0 30px 60px rgba(2,6,23,0.18)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            right: 14,
            top: 14,
            background: "transparent",
            border: "1px solid rgba(11,18,32,0.06)",
            color: "#0b1220",
            borderRadius: 8,
            padding: "6px 8px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{room.name} — Book</div>
            <div style={{ marginTop: 6, color: "#065f46", fontWeight: 700 }}>Available: {available}</div>
          </div>
          <div style={{ flex: "0 0 120px", textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Price</div>
            <div style={{ fontWeight: 700, color: "#4f46e5" }}>₹{room.pricePerNight}/night</div>
          </div>
        </div>

        <form onSubmit={(e) => onSubmit(e, formState, setFormState)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ fontSize: 13, color: "#374151" }}>Full name</label>
          <input
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
            placeholder="Guest name"
            style={{ padding: 12, borderRadius: 8, border: "1px solid #e6e9ef", background: "#fff", color: "#0b1220", fontSize: 15 }}
          />

          <label style={{ fontSize: 13, color: "#374151" }}>Email</label>
          <input
            value={formState.guestEmail}
            onChange={(e) => setFormState((s) => ({ ...s, guestEmail: e.target.value }))}
            placeholder="guest@domain.com"
            type="email"
            style={{ padding: 12, borderRadius: 8, border: "1px solid #e6e9ef", background: "#fff", color: "#0b1220", fontSize: 15 }}
          />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, color: "#374151" }}>Check-in</label>
              <input
                type="date"
                value={formState.checkIn}
                onChange={(e) => setFormState((s) => ({ ...s, checkIn: e.target.value }))}
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e9ef", background: "#fff" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, color: "#374151" }}>Check-out</label>
              <input
                type="date"
                value={formState.checkOut}
                onChange={(e) => setFormState((s) => ({ ...s, checkOut: e.target.value }))}
                style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e9ef", background: "#fff" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 13, color: "#374151", minWidth: 100 }}>Rooms to book</div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => setRoomsBooked(formState.roomsBooked - 1)}
                style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #e6e9ef", background: "#fff", cursor: "pointer" }}
              >
                −
              </button>
              <div style={{ minWidth: 44, textAlign: "center", fontWeight: 700 }}>{formState.roomsBooked}</div>
              <button
                type="button"
                onClick={() => setRoomsBooked(formState.roomsBooked + 1)}
                style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #e6e9ef", background: "#fff", cursor: "pointer" }}
              >
                +
              </button>
              <div style={{ color: "#6b7280", fontSize: 13 }}>of {available} available</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <button type="submit" style={{ flex: 1, background: "linear-gradient(90deg,#7c3aed,#4f46e5)", color: "white", padding: "12px 14px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer" }}>
              Confirm Booking
            </button>

            <button type="button" onClick={onClose} style={{ flex: 1, background: "#f3f4f6", color: "#111827", padding: "12px 14px", borderRadius: 10, border: "1px solid #e6e9ef", fontWeight: 600, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ==========================
   ExploreModal
   ========================== */
function ExploreModal({ room, onClose, onThumbClick }) {
  if (!room) return null;
  const gallery = room.gallery || [room.image];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4,6,12,0.45)",
        zIndex: 4100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: 820,
          maxWidth: "98%",
          background: "#ffffff",
          color: "#0b1220",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 30px 80px rgba(2,6,23,0.18)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            right: 14,
            top: 14,
            background: "transparent",
            border: "1px solid rgba(11,18,32,0.06)",
            color: "#0b1220",
            borderRadius: 8,
            padding: "6px 8px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{room.name}</div>
            <div style={{ marginTop: 6, color: "#4f46e5", fontWeight: 700 }}>₹{room.pricePerNight}/night</div>
            <div style={{ marginTop: 6, fontSize: 14, color: "#059669" }}>{room.availableNow > 0 ? `${room.availableNow} room(s) available` : "Currently full"}</div>

            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Perks</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#374151", lineHeight: 1.7 }}>
                {room.perks && room.perks.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>

          <div style={{ flex: "0 0 260px" }}>
            <div style={{ width: "100%", height: 160, borderRadius: 10, overflow: "hidden", border: "1px solid #eef2f6" }}>
              <img
                src={gallery[0]}
                alt={`${room.name} preview`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='480'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'%3EPhoto unavailable%3C/text%3E%3C/svg%3E";
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Room Photos (tap to open / zoom)</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", overflowX: "auto", paddingBottom: 6 }}>
            {gallery.map((src, idx) => (
              <div
                key={idx}
                onClick={() => onThumbClick(gallery, idx)}
                style={{
                  flex: "0 0 auto",
                  width: 140,
                  height: 90,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid #eef2f6",
                  cursor: "pointer",
                  boxShadow: "0 6px 16px rgba(11,18,32,0.06)",
                }}
              >
                <img
                  src={src}
                  alt={`${room.name} ${idx + 1}`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='16'%3EPhoto unavailable%3C/text%3E%3C/svg%3E";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18, textAlign: "center" }}>
          <button onClick={onClose} style={{ background: "#111827", color: "white", padding: "10px 18px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================
   EditRoomModal (admin)
   - change name/price/totalRooms
   - add/remove perks
   - upload photos (FileReader -> dataURL)
   - set main image & delete images
   - delete room
   ========================== */
function EditRoomModal({ room: initialRoom, onClose, onSave, onDelete }) {
  const [local, setLocal] = useState(() => ({ ...(initialRoom || {}) }));

  useEffect(() => setLocal({ ...(initialRoom || {}) }), [initialRoom]);

  if (!initialRoom) return null;

  const handleFiles = (files) => {
    const arr = Array.from(files || []);
    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        setLocal((s) => ({ ...s, gallery: [...(s.gallery || []), dataUrl] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (idx) => {
    setLocal((s) => {
      const g = [...(s.gallery || [])];
      g.splice(idx, 1);
      const newMain = (s.image && g.includes(s.image)) ? s.image : (g[0] || "");
      return { ...s, gallery: g, image: newMain };
    });
  };

  const setMainImage = (idx) => {
    setLocal((s) => ({ ...s, image: s.gallery && s.gallery[idx] ? s.gallery[idx] : s.image }));
  };

  const addPerk = (text) => {
    if (!text || !text.trim()) return;
    setLocal((s) => ({ ...s, perks: [...(s.perks || []), text.trim()] }));
  };

  const removePerk = (idx) => setLocal((s) => ({ ...s, perks: (s.perks || []).filter((_, i) => i !== idx) }));

  const handleSave = () => {
    if (!local.name || !local.pricePerNight || !local.totalRooms) return alert("Fill name, price and total rooms.");
    const updated = { ...local, pricePerNight: Number(local.pricePerNight), totalRooms: Math.max(0, Number(local.totalRooms)) };
    onSave && onSave(updated);
    onClose && onClose();
  };

  const handleDelete = () => {
    if (!confirm("Delete this room? This will remove the room and optionally its bookings/bills.")) return;
    onDelete && onDelete(local.id);
    onClose && onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4,6,12,0.45)",
        zIndex: 5000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div style={{ width: 820, maxWidth: "98%", background: "white", borderRadius: 12, padding: 20, boxShadow: "0 30px 60px rgba(2,6,23,0.18)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", right: 12, top: 12, border: "none", background: "transparent", cursor: "pointer" }}>
          ✖
        </button>

        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Edit Room — {initialRoom.name}</h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, marginTop: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, color: "#374151" }}>Name</label>
            <input value={local.name || ""} onChange={(e) => setLocal((s) => ({ ...s, name: e.target.value }))} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e9ef", marginBottom: 8 }} />

            <label style={{ display: "block", fontSize: 13, color: "#374151" }}>Price per night (₹)</label>
            <input value={local.pricePerNight || ""} onChange={(e) => setLocal((s) => ({ ...s, pricePerNight: e.target.value }))} type="number" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e9ef", marginBottom: 8 }} />

            <label style={{ display: "block", fontSize: 13, color: "#374151" }}>Total Rooms</label>
            <input value={local.totalRooms || ""} onChange={(e) => setLocal((s) => ({ ...s, totalRooms: e.target.value }))} type="number" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #e6e9ef", marginBottom: 12 }} />

            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Perks</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input id="newPerk" placeholder="e.g. Free Breakfast" style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #e6e9ef" }} />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("newPerk");
                    addPerk(el.value);
                    el.value = "";
                  }}
                  style={{ padding: "8px 12px", borderRadius: 8, background: "#4f46e5", color: "white", border: "none", cursor: "pointer" }}
                >
                  Add
                </button>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {(local.perks || []).map((p, i) => (
                  <li key={i} style={{ marginBottom: 6, display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                    <span style={{ color: "#374151" }}>{p}</span>
                    <button onClick={() => removePerk(i)} style={{ background: "#fee2e2", color: "#b91c1c", border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer" }}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Upload photos (you can drag & drop files here)</div>
              <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} style={{ marginTop: 8 }} />
              <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(local.gallery || []).map((src, idx) => (
                  <div key={idx} style={{ width: 96, height: 64, borderRadius: 8, overflow: "hidden", position: "relative", border: "1px solid #eef2f6" }}>
                    <img
                      src={src}
                      alt={"img" + idx}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div style={{ position: "absolute", right: 6, top: 6, display: "flex", gap: 6 }}>
                      <button onClick={() => setMainImage(idx)} title="Set as main" style={{ background: "#eef2ff", border: "none", padding: "4px 6px", borderRadius: 6, cursor: "pointer" }}>
                        Main
                      </button>
                      <button onClick={() => removeGalleryImage(idx)} title="Remove" style={{ background: "#fee2e2", border: "none", padding: "4px 6px", borderRadius: 6, cursor: "pointer" }}>
                        Del
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderLeft: "1px solid #eef2f6", paddingLeft: 12 }}>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Preview & Meta</div>
            <div style={{ width: "100%", height: 160, borderRadius: 10, overflow: "hidden", border: "1px solid #eef2f6", marginBottom: 8 }}>
              <img
                src={local.image || (local.gallery && local.gallery[0]) || ""}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='480'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: "#6b7280" }}>ID</div>
              <div style={{ fontWeight: 700 }}>{local.id}</div>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button onClick={handleSave} style={{ flex: 1, background: "#10b981", color: "white", padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700 }}>
                Save
              </button>
              <button onClick={handleDelete} style={{ flex: 1, background: "#ef4444", color: "white", padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700 }}>
                Delete Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================
   Main App
   ========================== */
export default function App() {
  // pages: "login" | "signup" | "home"
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Deluxe Suite",
      pricePerNight: 4500,
      image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=1600&auto=format&fit=crop&q=60",
      totalRooms: 10,
      perks: ["Free WiFi", "Rainfall Shower", "Mini Bar", "City View"],
      gallery: ["/deluxe.jpeg", "/deluxe1.jpeg", "/deluxe2.jpeg"],
    },
    {
      id: 2,
      name: "Executive Room",
      pricePerNight: 3200,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=60",
      totalRooms: 10,
      perks: ["Work Desk", "Complimentary Breakfast", "Smart TV", "Cityscape View"],
      gallery: ["/executive.jpeg", "/executive1.jpeg", "/executive2.jpeg"],
    },
    {
      id: 3,
      name: "Family Room",
      pricePerNight: 5000,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&auto=format&fit=crop&q=60",
      totalRooms: 10,
      perks: ["Extra Beds Available", "Kids Play Pack", "Kitchenette", "Garden View"],
      gallery: ["/family.jpeg", "/family1.jpeg", "/family2.jpeg"],
    },
  ]);

  const [bookings, setBookings] = useState([]);
  const [bills, setBills] = useState([]);
  const [bookingPopup, setBookingPopup] = useState({ open: false, roomId: null });
  const [explorePopup, setExplorePopup] = useState({ open: false, room: null });

  // lightbox & bills & admin edit
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxStart, setLightboxStart] = useState(0);
  const [activeBill, setActiveBill] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);

  const ADMIN_EMAIL = "admin@dreamstay.com";
  const ADMIN_PASS = "admin123";

  // ---------------- persistence ----------------
  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("ds_users") || "[]");
      if (Array.isArray(storedUsers)) setUsers(storedUsers);
    } catch (e) {
      console.warn("failed to parse ds_users", e);
    }
    try {
      const storedRooms = JSON.parse(localStorage.getItem("ds_rooms") || "[]");
      if (Array.isArray(storedRooms) && storedRooms.length) setRooms(storedRooms);
    } catch (e) {
      console.warn("failed to parse ds_rooms", e);
    }
    try {
      const storedBookings = JSON.parse(localStorage.getItem("ds_bookings") || "[]");
      if (Array.isArray(storedBookings)) setBookings(storedBookings);
    } catch (e) {
      console.warn("failed to parse ds_bookings", e);
    }
    try {
      const storedBills = JSON.parse(localStorage.getItem("ds_bills") || "[]");
      if (Array.isArray(storedBills)) setBills(storedBills);
    } catch (e) {
      console.warn("failed to parse ds_bills", e);
    }
  }, []);

  useEffect(() => localStorage.setItem("ds_users", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("ds_rooms", JSON.stringify(rooms)), [rooms]);
  useEffect(() => localStorage.setItem("ds_bookings", JSON.stringify(bookings)), [bookings]);
  useEffect(() => localStorage.setItem("ds_bills", JSON.stringify(bills)), [bills]);

  // ---------------- auth ----------------
  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields!");
    if (users.find((u) => u.email === email)) {
      alert("Email already registered — login instead.");
      return;
    }
    setUsers((s) => [...s, { email, password }]);
    alert("Signup successful — please login.");
    setEmail("");
    setPassword("");
    setPage("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAdmin(true);
      setUser({ email, role: "admin" });
      setPage("home");
      setEmail("");
      setPassword("");
      return;
    }
    const u = users.find((x) => x.email === email && x.password === password);
    if (u) {
      setUser({ email: u.email, role: "user" });
      setIsAdmin(false);
      setPage("home");
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid credentials or user not signed up.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setPage("login");
  };

  // ---------------- rooms/bookings logic ----------------
  const getAvailableForRoom = (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room) return 0;
    const booked = bookings.filter((b) => b.roomId === roomId).reduce((s, b) => s + Number(b.roomsBooked || 0), 0);
    return Math.max(0, (room.totalRooms || 0) - booked);
  };

  const openBookingPopup = (roomId) => setBookingPopup({ open: true, roomId });
  const openExplorePopup = (room) => {
    setExplorePopup({
      open: true,
      room: {
        ...room,
        perks: room.perks || ["Free WiFi", "Breakfast Included", "King Size Bed", "City View"],
        gallery: room.gallery || [room.image, room.image, room.image, room.image],
        availableNow: getAvailableForRoom(room.id),
      },
    });
  };

  // lightbox helpers
  const openLightbox = (images = [], start = 0) => {
    setLightboxImages(images || []);
    setLightboxStart(start || 0);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  // billing helpers
  const createBillForBooking = (booking, room) => {
    const subtotal = Number(booking.totalAmount || 0);
    const gst = Math.round((subtotal * 0.05) * 100) / 100; // 5%
    const total = Math.round((subtotal + gst) * 100) / 100;
    const bill = {
      id: `BILL-${Date.now()}`,
      bookingId: booking.id,
      ownerEmail: booking.guestEmail,
      ownerName: booking.guestName,
      roomName: booking.roomName,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      nights: booking.nights,
      roomsBooked: booking.roomsBooked,
      pricePerNight: room.pricePerNight || 0,
      subtotal,
      gst,
      total,
      createdAt: new Date().toISOString(),
    };
    return bill;
  };

  // booking submit creates booking + bill
  const handleBookSubmit = (evt, formState, setFormState) => {
    evt.preventDefault();
    const { name, guestEmail, checkIn, checkOut, roomsBooked } = formState;
    const roomsBookedN = Number(roomsBooked || 0);
    if (!name || !guestEmail || !checkIn || !checkOut || !roomsBookedN) {
      alert("Please fill all booking fields.");
      return;
    }
    const cin = new Date(checkIn),
      cout = new Date(checkOut);
    if (isNaN(cin) || isNaN(cout) || cout <= cin) {
      alert("Check-out must be after check-in.");
      return;
    }
    const room = rooms.find((r) => r.id === bookingPopup.roomId);
    if (!room) return alert("Selected room not found.");
    const available = getAvailableForRoom(room.id);
    if (roomsBookedN > available) return alert(`Only ${available} rooms available for ${room.name}.`);
    const nights = Math.ceil((cout - cin) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * (room.pricePerNight || 0) * roomsBookedN;

    const newBooking = {
      id: Date.now(),
      roomId: room.id,
      roomName: room.name,
      guestName: name,
      guestEmail,
      checkIn,
      checkOut,
      roomsBooked: roomsBookedN,
      nights,
      totalAmount,
      createdAt: new Date().toISOString(),
    };

    setBookings((b) => [...b, newBooking]);
    // create bill
    const bill = createBillForBooking(newBooking, room);
    setBills((s) => [...s, bill]);

    setBookingPopup({ open: false, roomId: null });
    setFormState({ name: "", guestEmail: "", checkIn: "", checkOut: "", roomsBooked: 1 });
    setActiveBill(bill);

    alert(`✅ Booked ${roomsBookedN} x ${room.name}. Total ₹${totalAmount} (GST shown on bill)`);
  };

  const handleCheckout = (bookingId) => {
    const b = bookings.find((x) => x.id === bookingId);
    if (!b) return;
    if (!confirm(`Check out booking for ${b.guestName}? This will free ${b.roomsBooked} room(s).`)) return;
    setBookings((s) => s.filter((x) => x.id !== bookingId));
    alert("Checked out and rooms freed.");
  };

  const adminAdjustRooms = (roomId, delta) => {
    setRooms((prev) => prev.map((r) => (r.id !== roomId ? r : { ...r, totalRooms: Math.max(0, (r.totalRooms || 0) + delta) })));
  };

  const saveRoomChanges = (updatedRoom) => {
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? { ...r, ...updatedRoom } : r)));
    setEditingRoom(null);
    alert("Room updated.");
  };

  // delete room callback (from EditRoomModal)
  const deleteRoomAndCleanup = (roomId) => {
    // find room name for bill cleanup if needed
    const roomName = rooms.find((r) => r.id === roomId)?.name;
    setRooms((s) => s.filter((r) => r.id !== roomId));
    setBookings((s) => s.filter((b) => b.roomId !== roomId));
    // optional: keep bills but mark removed room - here we keep bills
    // setBills(s => s.filter(bl => bl.roomName !== roomName));
  };

  const handleShowBill = (billId) => {
    const b = bills.find((x) => x.id === billId);
    if (!b) return alert("Bill not found.");
    if (!isAdmin && user?.email !== b.ownerEmail) return alert("You can only view your own bills.");
    setActiveBill(b);
  };

  const myBookings = user ? bookings.filter((b) => b.guestEmail === user.email) : [];
  const myBills = user ? bills.filter((bl) => bl.ownerEmail === user.email) : [];

  // UI: login/signup
  if (page === "login") {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(90deg,#6366f1,#a855f7,#ec4899)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div style={{ background: "white", width: 520, maxWidth: "95%", borderRadius: 24, boxShadow: "0 30px 60px rgba(0,0,0,0.18)", padding: 28, textAlign: "center" }}>
          <FaHotel style={{ fontSize: 48, color: "#4f46e5" }} />
          <h2 style={{ fontSize: 28, fontWeight: 600, margin: "16px 0 24px", color: "#374151" }}>DreamStay — Login</h2>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ textAlign: "left" }}>
              <label style={{ fontSize: 14, color: "#4b5563", display: "block", marginBottom: 4 }}>
                <FaEnvelope style={{ marginRight: 6, color: "#9ca3af" }} /> Email
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                style={{ width: "100%", borderRadius: 10, border: "1px solid #d1d5db", padding: 12, fontSize: 16 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ textAlign: "left" }}>
              <label style={{ fontSize: 14, color: "#4b5563", display: "block", marginBottom: 4 }}>
                <FaLock style={{ marginRight: 6, color: "#9ca3af" }} /> Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                style={{ width: "100%", borderRadius: 10, border: "1px solid #d1d5db", padding: 12, fontSize: 16 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button style={{ width: "100%", background: "#4f46e5", color: "white", padding: 12, fontWeight: 600, fontSize: 16, borderRadius: 10, border: "none", cursor: "pointer" }}>Login</button>
          </form>
          <p style={{ marginTop: 16, color: "#6b7280", fontSize: 14 }}>Don't have an account? <span style={{ color: "#4f46e5", fontWeight: 600, cursor: "pointer" }} onClick={() => setPage("signup")}>Sign up</span></p>
        </div>
      </div>
    );
  }

  if (page === "signup") {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          background: "linear-gradient(90deg,#ec4899,#a855f7,#6366f1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div style={{ background: "white", width: 520, maxWidth: "95%", borderRadius: 24, boxShadow: "0 30px 60px rgba(0,0,0,0.18)", padding: 28, textAlign: "center" }}>
          <FaUser style={{ fontSize: 48, color: "#ec4899" }} />
          <h2 style={{ fontSize: 28, fontWeight: 600, margin: "16px 0 24px", color: "#374151" }}>Create Account</h2>
          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ textAlign: "left" }}>
              <label style={{ fontSize: 14, color: "#4b5563", display: "block", marginBottom: 4 }}>
                <FaEnvelope style={{ marginRight: 6, color: "#9ca3af" }} /> Email
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                style={{ width: "100%", borderRadius: 10, border: "1px solid #d1d5db", padding: 12, fontSize: 16 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ textAlign: "left" }}>
              <label style={{ fontSize: 14, color: "#4b5563", display: "block", marginBottom: 4 }}>
                <FaLock style={{ marginRight: 6, color: "#9ca3af" }} /> Password
              </label>
              <input
                type="password"
                placeholder="create a password"
                style={{ width: "100%", borderRadius: 10, border: "1px solid #d1d5db", padding: 12, fontSize: 16 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button style={{ width: "100%", background: "#ec4899", color: "white", padding: 12, fontWeight: 600, fontSize: 16, borderRadius: 10, border: "none", cursor: "pointer" }}>Sign Up</button>
          </form>
          <p style={{ marginTop: 16, color: "#6b7280", fontSize: 14 }}>Already have an account? <span style={{ color: "#ec4899", fontWeight: 600, cursor: "pointer" }} onClick={() => setPage("login")}>Login</span></p>
        </div>
      </div>
    );
  }

  // HOME
  const roomsWithAvailability = rooms.map((r) => ({ ...r, availableRooms: getAvailableForRoom(r.id) }));

  return (
    <>
      {/* top nav */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", zIndex: 1000 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700, color: "#4f46e5", fontSize: 20 }}>🏨 DreamStay Hotels</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ color: "#4b5563" }}>{isAdmin ? "Admin" : user?.email || "Guest"}</div>
            <button onClick={handleLogout} style={{ background: "#fdecea", color: "#b91c1c", border: "none", padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ minHeight: "100vh", background: "#f7fafc", color: "#111827", paddingTop: 84, paddingBottom: 40 }}>
        {/* hero */}
        <div style={{ maxWidth: 1100, margin: "0 auto 20px", padding: 28, textAlign: "center", borderRadius: 12, background: "linear-gradient(90deg,#5962f7,#ec4899)", color: "white", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600 }}>{isAdmin ? "Admin Panel" : "Welcome to DreamStay"}</h1>
          <p style={{ marginTop: 8, color: "rgba(255,255,255,0.95)" }}>{isAdmin ? "Manage rooms & view bookings." : "Choose a room, pick dates, and book instantly."}</p>
        </div>

        {/* if user (non-admin) show My Bookings & Bills */}
        {!isAdmin && user && (
          <div style={{ maxWidth: 1100, margin: "0 auto 20px", padding: "0 20px" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>My Bookings</h2>
            {myBookings.length === 0 ? <div style={{ color: "#6b7280" }}>You have no bookings yet.</div> : (
              <div style={{ display: "grid", gap: 10 }}>
                {myBookings.map((b) => (
                  <div key={b.id} style={{ background: "white", padding: 12, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{b.roomName} × {b.roomsBooked}</div>
                      <div style={{ color: "#6b7280", fontSize: 13 }}>{b.checkIn} → {b.checkOut} ({b.nights} night{b.nights > 1 ? 's' : ''})</div>
                      <div style={{ color: "#4f46e5", fontWeight: 700 }}>₹{b.totalAmount}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => {
                        const bl = bills.find(x => x.bookingId === b.id);
                        if (bl) setActiveBill(bl);
                        else alert("Bill not found (unexpected).");
                      }} style={{ background: "#eef2ff", color: "#3730a3", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>View Bill</button>
                      <button onClick={() => {
                        if (!confirm("Cancel booking? This will remove the booking but bill will remain.")) return;
                        setBookings((s) => s.filter(x => x.id !== b.id));
                      }} style={{ background: "#fee2e2", color: "#b91c1c", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h2 style={{ fontSize: 18, fontWeight: 700, margin: "18px 0 8px" }}>My Bills</h2>
            {myBills.length === 0 ? <div style={{ color: "#6b7280" }}>No bills yet.</div> : (
              <div style={{ display: "grid", gap: 10 }}>
                {myBills.map((bl) => (
                  <div key={bl.id} style={{ background: "white", padding: 12, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{bl.roomName} • ₹{bl.total}</div>
                      <div style={{ color: "#6b7280", fontSize: 13 }}>{new Date(bl.createdAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <button onClick={() => setActiveBill(bl)} style={{ background: "#eef2ff", color: "#3730a3", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>Open Bill</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* rooms grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20, padding: "0 20px" }}>
          {roomsWithAvailability.map((room) => (
            <div key={room.id} style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 6px 18px rgba(15,23,42,0.06)" }}>
              <img
                src={room.image}
                alt={room.name}
                onClick={() => openLightbox(room.gallery && room.gallery.length ? room.gallery : [room.image], 0)}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='24'%3EImage not available%3C/text%3E%3C/svg%3E"; }}
                style={{ width: "100%", height: 200, objectFit: "cover", cursor: "zoom-in" }}
              />
              <div style={{ padding: 18, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{room.name}</div>
                <div style={{ color: "#4f46e5", fontWeight: 600, marginBottom: 8 }}>₹{room.pricePerNight}/night</div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 12 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>Available</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#059669" }}>{room.availableRooms}</div>
                  </div>
                  <div style={{ width: 1, height: 44, background: "#e6e6e6" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, color: "#6b7280" }}>Total</div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{room.totalRooms}</div>
                  </div>
                </div>

                {isAdmin ? (
                  <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                    <button onClick={() => adminAdjustRooms(room.id, -1)} style={{ background: "#f3f4f6", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}><FaMinus /></button>
                    <button onClick={() => adminAdjustRooms(room.id, +1)} style={{ background: "#f3f4f6", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}><FaPlus /></button>
                    <button onClick={() => setEditingRoom(room)} style={{ background: "#fff", border: "1px solid #e6e9ef", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>Edit Room</button>
                    <div style={{ fontSize: 14, color: "#4b5563", fontWeight: 500, alignSelf: "center" }}>Adjust / Edit</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                    <button disabled={room.availableRooms <= 0} onClick={() => room.availableRooms > 0 && openBookingPopup(room.id)} style={{ background: room.availableRooms > 0 ? "#4f46e5" : "#d1d5db", color: "white", border: "none", padding: "10px 16px", borderRadius: 999, fontWeight: 600, cursor: room.availableRooms > 0 ? "pointer" : "not-allowed", opacity: room.availableRooms > 0 ? 1 : 0.6 }}>Book Now</button>
                    <button onClick={() => openExplorePopup(room)} style={{ background: "white", border: "1px solid #e5e7eb", color: "#1f2937", padding: "10px 16px", borderRadius: 10, fontWeight: 500, cursor: "pointer" }}>Explore</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* bookings (admin only) */}
        <div style={{ maxWidth: 1100, margin: "32px auto 0 auto", padding: "0 20px 60px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: "#1f2937", marginBottom: 12 }}>Current Bookings</h2>
          {isAdmin ? (
            bookings.length === 0 ? <div style={{ color: "#6b7280", fontSize: 14 }}>No bookings yet.</div> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {bookings.map((b) => (
                  <div key={b.id} style={{ background: "white", padding: 12, borderRadius: 10, boxShadow: "0 3px 10px rgba(0,0,0,0.03)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", rowGap: 10 }}>
                    <div style={{ minWidth: 200 }}>
                      <div style={{ fontWeight: 600, color: "#1f2937" }}>{b.roomName} × {b.roomsBooked}</div>
                      <div style={{ color: "#6b7280", fontSize: 14 }}>{b.guestName} — {b.guestEmail}</div>
                      <div style={{ color: "#6b7280", fontSize: 14 }}>{b.checkIn} → {b.checkOut} ({b.nights} night{b.nights > 1 ? "s" : ""})</div>
                      <div style={{ color: "#4f46e5", fontSize: 14, fontWeight: 600 }}>₹{b.totalAmount}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => handleCheckout(b.id)} style={{ background: "#dcfce7", color: "#065f46", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500 }}>Check Out</button>
                      <button onClick={() => {
                        const bl = bills.find(x => x.bookingId === b.id);
                        if (bl) setActiveBill(bl);
                        else alert("No bill found for this booking (unexpected).");
                      }} style={{ background: "#eef2ff", color: "#3730a3", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500 }}>View Bill</button>
                      <button onClick={() => { if (!confirm("Delete this booking?")) return; setBookings((s) => s.filter(x => x.id !== b.id)); }} style={{ background: "#fee2e2", color: "#b91c1c", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500 }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div style={{ color: "#6b7280", fontSize: 14 }}>Bookings are private — only admin can view all current bookings.</div>
          )}
        </div>
      </div>

      {/* Booking modal */}
      {bookingPopup.open && (
        <BookingModal
          room={rooms.find((r) => r.id === bookingPopup.roomId)}
          available={getAvailableForRoom(bookingPopup.roomId)}
          onClose={() => setBookingPopup({ open: false, roomId: null })}
          onSubmit={(evt, formState, setFormState) => handleBookSubmit(evt, formState, setFormState)}
        />
      )}

      {/* Explore modal */}
      {explorePopup.open && explorePopup.room && (
        <ExploreModal room={explorePopup.room} onClose={() => setExplorePopup({ open: false, room: null })} onThumbClick={(images, idx) => openLightbox(images, idx)} />
      )}

      {/* Edit room modal (admin) */}
      {editingRoom && (
        <EditRoomModal
          room={editingRoom}
          onClose={() => setEditingRoom(null)}
          onSave={(updated) => saveRoomChanges(updated)}
          onDelete={(roomId) => deleteRoomAndCleanup(roomId)}
        />
      )}

      {/* Bill modal */}
      {activeBill && <BillModal bill={activeBill} onClose={() => setActiveBill(null)} />}

      {/* Lightbox */}
      {lightboxOpen && <Lightbox images={lightboxImages} startIndex={lightboxStart} onClose={closeLightbox} />}
    </>
  );
}
