
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { MediaItem, MediaType } from '../types';
import { Plus, Trash2, Save, Database, Upload, Loader2, CheckCircle } from 'lucide-react';

const Management: React.FC = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [newItem, setNewItem] = useState<Partial<MediaItem>>({
    fecha: new Date().getFullYear().toString()
  });

  useEffect(() => {
    fetchItems();
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Audios' },
        () => fetchItems()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('Audios')
      .select('*')
      .order('fecha', { ascending: false });
    
    if (data) {
      setItems(data as MediaItem[]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let audioUrl = "";
      if (audioFile) {
        const fileName = `${Date.now()}_${audioFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('audios')
          .upload(fileName, audioFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('audios')
          .getPublicUrl(fileName);
        
        audioUrl = urlData.publicUrl;
      }

      const { error: dbError } = await supabase.from('Audios').insert({
        titulo: newItem.titulo,
        acordeonero: newItem.acordeonero,
        autor: newItem.autor,
        fecha: newItem.fecha,
        duracion: newItem.duracion,
        descripcion: newItem.descripcion,
        audio_url: audioUrl
      });

      if (dbError) throw dbError;

      setShowForm(false);
      setAudioFile(null);
      setNewItem({ fecha: '2024' });
      fetchItems();
    } catch (error: any) {
      console.error("Error al subir:", error);
      alert("Error: " + (error.message || "No se pudo guardar en Supabase."));
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (item: MediaItem) => {
    if (window.confirm(`¿Eliminar "${item.titulo}" permanentemente?`)) {
      try {
        await supabase.from('Audios').delete().eq('id', item.id);
        if (item.audio_url) {
          const path = item.audio_url.split('/').pop();
          if (path) {
            await supabase.storage.from('audios').remove([path]);
          }
        }
        fetchItems();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-vallenato-blue flex items-center">
              <Database className="mr-3 w-8 h-8 text-vallenato-mustard" />
              Gestión de Audios
            </h1>
            <p className="text-gray-500">Panel administrativo conectado a la tabla Audios.</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-6 py-3 bg-vallenato-red text-white rounded-lg font-bold hover:bg-red-700 shadow-lg transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nueva Estampa
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border-t-8 border-vallenato-mustard animate-fade-in-up">
            <h2 className="text-xl font-bold mb-6 text-vallenato-blue border-b pb-2">Registrar nueva obra</h2>
            <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Título</label>
                <input required className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-vallenato-mustard outline-none" 
                  value={newItem.titulo || ''} onChange={e => setNewItem({...newItem, titulo: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Intérprete (Acordeonero)</label>
                <input required className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-vallenato-mustard outline-none" 
                  value={newItem.acordeonero || ''} onChange={e => setNewItem({...newItem, acordeonero: e.target.value})} />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700">Archivo de Audio (Obligatorio)</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className={`w-10 h-10 mb-3 ${audioFile ? 'text-green-500' : 'text-gray-400'}`} />
                      <p className="mb-2 text-sm text-gray-500">
                        {audioFile ? <span className="font-bold text-green-600">{audioFile.name}</span> : "Haz clic para subir el audio a Supabase Storage"}
                      </p>
                    </div>
                    <input type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Compositor (Autor)</label>
                <input required className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-vallenato-mustard outline-none" 
                  value={newItem.autor || ''} onChange={e => setNewItem({...newItem, autor: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Año</label>
                  <input required className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-vallenato-mustard outline-none" 
                    value={newItem.fecha || ''} onChange={e => setNewItem({...newItem, fecha: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">Duración</label>
                  <input required placeholder="04:20" className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-vallenato-mustard outline-none" 
                    value={newItem.duracion || ''} onChange={e => setNewItem({...newItem, duracion: e.target.value})} />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-bold text-gray-700">Historia de la canción</label>
                <textarea required rows={3} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-vallenato-mustard outline-none" 
                  value={newItem.descripcion || ''} onChange={e => setNewItem({...newItem, descripcion: e.target.value})} />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 text-gray-500 font-bold">Cancelar</button>
                <button 
                  disabled={loading}
                  type="submit" 
                  className={`px-8 py-2 rounded-lg font-bold text-white transition-all flex items-center ${loading ? 'bg-gray-400' : 'bg-vallenato-blue hover:bg-vallenato-red'}`}
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  {loading ? 'Subiendo...' : 'Publicar en Postgres'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-vallenato-blue text-white">
              <tr>
                <th className="p-4">Estampa</th>
                <th className="p-4">Intérprete</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-400 italic">No hay datos en la tabla Audios.</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-vallenato-blue">{item.titulo}</td>
                    <td className="p-4">{item.acordeonero}</td>
                    <td className="p-4">
                      <span className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                        <CheckCircle className="w-3 h-3 mr-1" /> En línea
                      </span>
                    </td>
                    <td className="p-4 flex justify-center">
                      <button onClick={() => deleteItem(item)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Management;
