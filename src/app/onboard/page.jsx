'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  category: yup.array().min(1, 'Select at least one category'),
  languages: yup.array().min(1, 'Select at least one language'),
  feeRange: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
});

const categories = ['Singer', 'Dancer', 'Speaker', 'DJ'];
const languages = ['Hindi', 'English', 'Punjabi', 'Tamil', 'Bengali'];
const feeRanges = ['₹0 - ₹10k', '₹10k - ₹25k', '₹25k - ₹50k', '₹50k+'];

export default function ArtistOnboardingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      profileImage: profileImage ? profileImage.name : 'Not uploaded',
    };
    console.log('Form submitted:', formData);
    reset();
    setProfileImage(null);
    setPreviewURL(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewURL(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewURL(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Artist Onboarding</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block mb-1">Name</label>
            <input {...register('name')} className="w-full border px-3 py-2 rounded-md" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="w-full">
            <label className="block mb-1">Location</label>
            <input {...register('location')} className="w-full border px-3 py-2 rounded-md" />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-1">Bio</label>
          <textarea {...register('bio')} className="w-full border px-3 py-2 rounded-md" rows="4" />
          {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map((cat) => (
              <label key={cat} className="text-sm flex items-center gap-2">
                <input type="checkbox" value={cat} {...register('category')} />
                {cat}
              </label>
            ))}
          </div>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block mb-2 font-medium">Languages Spoken</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {languages.map((lang) => (
              <label key={lang} className="text-sm flex items-center gap-2">
                <input type="checkbox" value={lang} {...register('languages')} />
                {lang}
              </label>
            ))}
          </div>
          {errors.languages && <p className="text-red-500 text-sm">{errors.languages.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Fee Range</label>
          <select {...register('feeRange')} className="w-full border px-3 py-2 rounded-md">
            <option value="">Select</option>
            {feeRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          {errors.feeRange && <p className="text-red-500 text-sm">{errors.feeRange.message}</p>}
        </div>

        <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Profile Image</label>
  
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
  />

  <p className="mt-1 text-xs text-gray-500">PNG, JPG or JPEG (optional)</p>
          {previewURL && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <img src={previewURL} alt="Preview" className="h-32 w-32 object-cover rounded-md border" />
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  );
}
