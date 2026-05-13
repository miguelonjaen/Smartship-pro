import React from 'react';
import { supabase } from '../supabaseClient';

const TestSubidaFoto = ({ userId, onUploadSuccess }: { userId: string, onUploadSuccess: () => void }) => {
  const handleTestUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('--- INICIANDO TEST DE SUBIDA ---');
    console.log('Subiendo...');

    // Filename as requested: avatar_${userId}.png
    const fileName = `avatar_${userId}.png`;

    const { error: uploadError } = await supabase.storage
      .from('avatares')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error('Error en subida:', uploadError.message);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatares')
      .getPublicUrl(fileName);

    console.log('URL obtenida:', publicUrl);

    const { error: updateError } = await supabase
      .from('usuarios')
      .update({ foto_perfil_url: publicUrl })
      .eq('id', userId);

    if (updateError) {
      console.error('Registro en BD: Error', updateError.message);
    } else {
      console.log('Registro en BD: OK');
      onUploadSuccess();
    }
  };

  return (
    <div className="p-6 bg-slate-900/80 border border-dashed border-cyan-500/30 rounded-2xl mt-6">
      <input 
        type="file" 
        onChange={handleTestUpload} 
        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 cursor-pointer" 
      />
    </div>
  );
};

export default TestSubidaFoto;
