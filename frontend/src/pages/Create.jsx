import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { uploadImage } from "../utils/imageUpload";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";

function Create() {
  const navigate = useNavigate();
  const { addPost } = usePost();
  const [activeTab, setActiveTab] = useState("text");
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [posting, setPosting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPG, PNG, GIF, WEBP)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Store the actual File object, not base64
    setMediaFile(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setMediaPreview(previewUrl);
  };

  const handleRemoveMedia = () => {
    // Clean up preview URL
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }
    setMediaFile(null);
    setMediaPreview(null);
  };

  const handlePost = async () => {
    if (!title.trim()) {
      alert("Please add a title");
      return;
    }

    setPosting(true);

    let postData = {
      title: title.trim(),
      type: activeTab,
    };

    try {
      if (activeTab === "text") {
        if (!textContent.trim()) {
          alert("Please add some text content");
          setPosting(false);
          return;
        }
        postData.text = textContent.trim();
      } else if (activeTab === "link") {
        if (!linkUrl.trim()) {
          alert("Please add a URL");
          setPosting(false);
          return;
        }
        postData.text = linkDescription.trim() || linkUrl;
        postData.url = linkUrl.trim();
      } else if (activeTab === "media") {
        if (!mediaFile) {
          alert("Please select an image");
          setPosting(false);
          return;
        }
        
        // Upload image to Supabase Storage
        setUploadingImage(true);
        const imageUrl = await uploadImage(mediaFile);
        setUploadingImage(false);
        
        if (!imageUrl) {
          alert("Failed to upload image. Please try again.");
          setPosting(false);
          return;
        }
        
        postData.text = "";
        postData.mediaUrl = imageUrl;
        postData.mediaType = "image";
      }

      const success = await addPost(postData);
      setPosting(false);
      
      if (success) {
        // Clean up
        handleRemoveMedia();
        navigate("/feed");
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
      setPosting(false);
    }
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <Navbar />

      {/* EVERYTHING BELOW NAVBAR */}
      <div className="pt-16 relative min-h-screen">

        {/* Background image */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/background.jpg')" }}
        />

        {/* Dark overlay */}
        <div className="fixed inset-0 -z-10 bg-black/70" />

        {/* Page content */}
        <div className="flex min-h-screen text-white">
          
          {/* LEFT SIDEBAR */}
          <LeftSidebar />

          {/* MAIN CONTENT */}
          <main className="flex-1 py-10 pl-1 pr-6 flex items-start justify-center pt-10">
            <div className="w-full max-w-3xl space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Create post</h1>
                <button className="text-sm text-slate-400 hover:text-white transition">
                  Drafts
                </button>
              </div>

              {/* Main Card */}
              <div
                className="relative bg-white/10 backdrop-blur-xl
                           rounded-2xl border border-white/30
                           shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
              >
                {/* Community Selector */}
                <div className="p-4 border-b border-white/20">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition border border-white/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <span className="text-sm font-medium">Select a community</span>
                  </button>
                </div>

                {/* Post Type Tabs */}
                <div className="flex border-b border-white/20">
                  <button 
                    onClick={() => setActiveTab("text")}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition border-b-2 ${
                      activeTab === "text" ? "border-orange-500 text-white" : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Text
                  </button>
                  <button 
                    onClick={() => setActiveTab("media")}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition border-b-2 ${
                      activeTab === "media" ? "border-orange-500 text-white" : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    Images & Video
                  </button>
                  <button 
                    onClick={() => setActiveTab("link")}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition border-b-2 ${
                      activeTab === "link" ? "border-orange-500 text-white" : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                    Link
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-4">
                  {/* Title Input */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, 300))}
                        placeholder="Title*"
                        className="w-full p-4 rounded-xl border border-white/30
                                   bg-white/5 text-white placeholder-slate-400
                                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <span className="absolute right-4 top-4 text-xs text-slate-400">
                        {title.length}/300
                      </span>
                    </div>
                  </div>

                  {/* Conditional Content Based on Tab */}
                  {activeTab === "text" && (
                    <textarea
                      rows="10"
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Body text..."
                      className="w-full p-4 rounded-xl border border-white/30
                                 bg-white/5 text-white placeholder-slate-400
                                 resize-none focus:outline-none
                                 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  )}

                  {activeTab === "media" && (
                    <div>
                      {!mediaPreview ? (
                        <label className="w-full min-h-75 p-8 rounded-xl border-2 border-dashed border-white/30
                                        bg-white/5 flex flex-col items-center justify-center
                                        hover:border-orange-500 hover:bg-white/10 transition cursor-pointer block">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-slate-400 mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                          </svg>
                          <p className="text-white font-medium mb-2">Click to upload image</p>
                          <p className="text-xs text-slate-500 mt-4">Supported formats: JPG, PNG, GIF, WEBP (Max 5MB)</p>
                        </label>
                      ) : (
                        <div className="relative rounded-xl overflow-hidden border border-white/30">
                          <img
                            src={mediaPreview}
                            alt="Preview"
                            className="w-full h-auto max-h-125 object-contain bg-black/20"
                          />
                          <button
                            onClick={handleRemoveMedia}
                            className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white
                                     hover:bg-red-600 transition active:scale-95"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "link" && (
                    <div className="space-y-4">
                      <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full p-4 rounded-xl border border-white/30
                                   bg-white/5 text-white placeholder-slate-400
                                   focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <textarea
                        rows="6"
                        value={linkDescription}
                        onChange={(e) => setLinkDescription(e.target.value)}
                        placeholder="Add a description (optional)"
                        className="w-full p-4 rounded-xl border border-white/30
                                   bg-white/5 text-white placeholder-slate-400
                                   resize-none focus:outline-none
                                   focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Add Tags */}
                  <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add tags
                  </button>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/20 flex justify-end gap-4">
                  <button
                    className="px-6 py-2.5 rounded-full border border-white/30
                               font-semibold hover:bg-white/10 transition
                               active:scale-95 text-sm"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={handlePost}
                    disabled={posting}
                    className={`px-6 py-2.5 rounded-full font-semibold transition
                               active:scale-95 text-sm ${
                                 posting 
                                   ? 'bg-orange-400 text-white cursor-not-allowed'
                                   : 'bg-orange-500 text-white hover:bg-orange-600'
                               }`}
                  >
                    {uploadingImage ? 'Uploading image...' : posting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Create;
