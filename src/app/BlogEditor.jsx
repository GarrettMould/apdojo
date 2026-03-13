'use client';

import { useState, useRef } from "react";

const TAGS = [
  "AP Macro", "AP Micro", "FRQ Tips", "MCQ Tips", "Graphs", 
  "Exam Strategy", "Key Concepts", "Study Tips"
];

const ACCENT_COLORS = {
  "AP Macro": "#FFE500",
  "AP Micro": "#4ADE80",
  "FRQ Tips": "#60A5FA",
  "MCQ Tips": "#F97316",
  "Graphs": "#FFE500",
  "Exam Strategy": "#4ADE80",
  "Key Concepts": "#60A5FA",
  "Study Tips": "#F97316",
};

export default function BlogEditor() {
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState(false);
  const fileRef = useRef();

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    const content = `# ${headline}\n\nTags: ${selectedTags.join(", ")}\n\n${body}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FFFDF0",
      fontFamily: "'Georgia', serif",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "4px solid #000",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#FFE500",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px", height: "36px",
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "900", color: "#FFE500", fontSize: "18px",
            fontFamily: "'Arial Black', sans-serif",
          }}>D</div>
          <span style={{
            fontFamily: "'Arial Black', sans-serif",
            fontWeight: "900", fontSize: "20px", letterSpacing: "-0.5px"
          }}>AP DOJO — BLOG EDITOR</span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setPreview(!preview)}
            style={{
              padding: "8px 20px",
              border: "3px solid #000",
              background: preview ? "#000" : "#FFFDF0",
              color: preview ? "#FFE500" : "#000",
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: "900", fontSize: "13px",
              cursor: "pointer",
              boxShadow: preview ? "none" : "3px 3px 0 #000",
              transition: "all 0.1s",
            }}
          >
            {preview ? "← EDIT" : "PREVIEW →"}
          </button>
          <button
            onClick={handleCopy}
            style={{
              padding: "8px 20px",
              border: "3px solid #000",
              background: copied ? "#4ADE80" : "#000",
              color: copied ? "#000" : "#FFE500",
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: "900", fontSize: "13px",
              cursor: "pointer",
              boxShadow: "3px 3px 0 #555",
              transition: "all 0.1s",
            }}
          >
            {copied ? "COPIED ✓" : "COPY ALL"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 32px" }}>
        {!preview ? (
          <>
            {/* Headline */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{
                display: "block",
                fontFamily: "'Arial Black', sans-serif",
                fontWeight: "900", fontSize: "11px",
                letterSpacing: "2px", marginBottom: "8px",
                textTransform: "uppercase",
              }}>Headline</label>
              <input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Write a punchy headline..."
                style={{
                  width: "100%",
                  border: "4px solid #000",
                  padding: "16px 20px",
                  fontSize: "28px",
                  fontFamily: "'Arial Black', sans-serif",
                  fontWeight: "900",
                  background: "#FFFDF0",
                  outline: "none",
                  boxShadow: "5px 5px 0 #000",
                  boxSizing: "border-box",
                  letterSpacing: "-0.5px",
                }}
              />
            </div>

            {/* Tags */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{
                display: "block",
                fontFamily: "'Arial Black', sans-serif",
                fontWeight: "900", fontSize: "11px",
                letterSpacing: "2px", marginBottom: "12px",
                textTransform: "uppercase",
              }}>Tags</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {TAGS.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      style={{
                        padding: "6px 14px",
                        border: "3px solid #000",
                        background: active ? ACCENT_COLORS[tag] : "#FFFDF0",
                        color: "#000",
                        fontFamily: "'Arial Black', sans-serif",
                        fontWeight: "900", fontSize: "11px",
                        cursor: "pointer",
                        boxShadow: active ? "none" : "3px 3px 0 #000",
                        transform: active ? "translate(2px, 2px)" : "none",
                        transition: "all 0.1s",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{
                display: "block",
                fontFamily: "'Arial Black', sans-serif",
                fontWeight: "900", fontSize: "11px",
                letterSpacing: "2px", marginBottom: "12px",
                textTransform: "uppercase",
              }}>Cover Image</label>
              <div
                onClick={() => fileRef.current.click()}
                style={{
                  border: "4px dashed #000",
                  padding: "24px",
                  cursor: "pointer",
                  background: imagePreview ? "transparent" : "#F5F5E8",
                  textAlign: "center",
                  position: "relative",
                  minHeight: imagePreview ? "240px" : "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="cover" style={{
                      width: "100%", height: "240px",
                      objectFit: "cover", display: "block",
                    }} />
                    <div style={{
                      position: "absolute", top: "12px", right: "12px",
                      background: "#FFE500", border: "3px solid #000",
                      padding: "4px 10px",
                      fontFamily: "'Arial Black', sans-serif",
                      fontSize: "10px", fontWeight: "900",
                    }}>CHANGE IMAGE</div>
                  </>
                ) : (
                  <div>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>+</div>
                    <div style={{
                      fontFamily: "'Arial Black', sans-serif",
                      fontWeight: "900", fontSize: "12px", letterSpacing: "1px"
                    }}>UPLOAD COVER IMAGE</div>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                style={{ display: "none" }}
              />
            </div>

            {/* Body */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "8px"
              }}>
                <label style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontWeight: "900", fontSize: "11px",
                  letterSpacing: "2px", textTransform: "uppercase",
                }}>Body</label>
                <span style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontSize: "10px", color: "#666", letterSpacing: "1px"
                }}>
                  {wordCount} WORDS · {readTime} MIN READ
                </span>
              </div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Start writing your post... Explain the concept, break down the graph, give students the edge they need."
                rows={18}
                style={{
                  width: "100%",
                  border: "4px solid #000",
                  padding: "20px",
                  fontSize: "17px",
                  fontFamily: "'Georgia', serif",
                  lineHeight: "1.8",
                  background: "#FFFDF0",
                  outline: "none",
                  resize: "vertical",
                  boxShadow: "5px 5px 0 #000",
                  boxSizing: "border-box",
                  color: "#111",
                }}
              />
            </div>

            {/* Bottom stats bar */}
            <div style={{
              border: "3px solid #000",
              padding: "12px 20px",
              background: "#000",
              display: "flex", gap: "24px",
              alignItems: "center",
            }}>
              <span style={{
                color: "#FFE500",
                fontFamily: "'Arial Black', sans-serif",
                fontSize: "11px", fontWeight: "900", letterSpacing: "1px"
              }}>
                {headline ? "✓ HEADLINE" : "○ HEADLINE"}
              </span>
              <span style={{
                color: selectedTags.length ? "#4ADE80" : "#666",
                fontFamily: "'Arial Black', sans-serif",
                fontSize: "11px", fontWeight: "900", letterSpacing: "1px"
              }}>
                {selectedTags.length ? `✓ ${selectedTags.length} TAG${selectedTags.length > 1 ? "S" : ""}` : "○ TAGS"}
              </span>
              <span style={{
                color: imagePreview ? "#4ADE80" : "#666",
                fontFamily: "'Arial Black', sans-serif",
                fontSize: "11px", fontWeight: "900", letterSpacing: "1px"
              }}>
                {imagePreview ? "✓ IMAGE" : "○ IMAGE"}
              </span>
              <span style={{
                color: wordCount > 50 ? "#4ADE80" : "#666",
                fontFamily: "'Arial Black', sans-serif",
                fontSize: "11px", fontWeight: "900", letterSpacing: "1px"
              }}>
                {wordCount > 50 ? `✓ BODY (${wordCount}w)` : `○ BODY (${wordCount}w)`}
              </span>
            </div>
          </>
        ) : (
          /* PREVIEW MODE */
          <div>
            {selectedTags.length > 0 && (
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                {selectedTags.map(tag => (
                  <span key={tag} style={{
                    padding: "4px 12px",
                    border: "3px solid #000",
                    background: ACCENT_COLORS[tag],
                    fontFamily: "'Arial Black', sans-serif",
                    fontWeight: "900", fontSize: "11px",
                    letterSpacing: "0.5px",
                  }}>{tag}</span>
                ))}
              </div>
            )}
            <h1 style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: "900", fontSize: "42px",
              lineHeight: "1.1", marginBottom: "24px",
              letterSpacing: "-1px", borderBottom: "4px solid #000",
              paddingBottom: "24px",
            }}>
              {headline || "Your headline will appear here..."}
            </h1>
            <div style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: "12px", color: "#666",
              letterSpacing: "1px", marginBottom: "32px",
            }}>
              {readTime} MIN READ · {wordCount} WORDS
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="cover" style={{
                width: "100%", height: "360px",
                objectFit: "cover",
                border: "4px solid #000",
                boxShadow: "6px 6px 0 #000",
                marginBottom: "40px",
                display: "block",
              }} />
            )}
            <div style={{
              fontSize: "18px", lineHeight: "1.9",
              fontFamily: "'Georgia', serif", color: "#111",
              whiteSpace: "pre-wrap",
            }}>
              {body || "Your post body will appear here..."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
