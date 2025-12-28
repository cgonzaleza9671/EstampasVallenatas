
import React, { useState } from 'react';
import { Award, Mic, Music, Quote, Send, Sparkles, MessageSquareQuote, Loader2, User, MapPin, CheckCircle2, History } from 'lucide-react';
import { APP_IMAGES } from '../constants';
import { GoogleGenAI } from "@google/genai";
import { supabase } from '../supabase';

const About: React.FC = () => {
  // Text Chat State
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !userName.trim() || !userCity.trim()) return;

    setIsAsking(true);
    setAnswer('');
    setSubmitStatus('idle');

    try {
      const { error: dbError } = await supabase.from('Preguntas').insert([
        {
          nombre_apellido: userName,
          ciudad: userCity,
          pregunta: question,
          fecha_envio: new Date().toISOString()
        }
      ]);
      if (dbError) throw dbError;
      setSubmitStatus('success');

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Usuario: ${userName} desde ${userCity}\nPregunta: ${question}`,
        config: {
          systemInstruction: `Eres Álvaro González Pimienta, un experto de 79 años en folclor vallenato. Responde con autoridad y calidez caribeña. Firma como "Álvaro González".`,
        },
      });
      setAnswer(response.text || "Intenta preguntarme de nuevo, maestro.");
      setUserName(''); setUserCity(''); setQuestion('');
    } catch (error) {
      setSubmitStatus('error');
      setAnswer("Intenta preguntarme más tarde.");
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      
      {/* Header Section */}
      <div className="relative bg-vallenato-blue text-white py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-vallenato-mustard opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-vallenato-red opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Álvaro González Pimienta</h1>
            <div className="h-1 w-24 bg-vallenato-mustard mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl font-light text-vallenato-cream max-w-2xl mx-auto">
                El guardián de las melodías y la memoria del Magdalena Grande.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Section 1: Main Bio & Primary Image */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            <div className="lg:w-1/2 relative flex flex-col items-center">
                <div className="relative w-full max-w-md mx-auto">
                    <div className="absolute top-4 -left-4 w-full h-full border-2 border-vallenato-mustard rounded-3xl hidden lg:block"></div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] w-full">
                         <img 
                            src={APP_IMAGES.aboutMain}
                            alt="Álvaro González Pimienta" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <p className="mt-4 text-center font-serif text-gray-500 italic text-sm tracking-wide">
                  Álvaro González Pimienta junto al maestro Rafael Escalona
                </p>
            </div>
            
            <div className="lg:w-1/2 space-y-6">
                <div className="inline-flex items-center space-x-2 text-vallenato-red font-bold uppercase tracking-wider text-sm">
                    <span className="w-8 h-[2px] bg-vallenato-red"></span>
                    <span>Trayectoria</span>
                </div>
                <h2 className="text-4xl font-serif text-vallenato-blue font-bold">Una vida hecha canción</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Álvaro González Pimienta es mucho más que un experto; es un apasionado custodio del folclor. Su vida ha estado dedicada a documentar, preservar y difundir las historias humanas detrás de las melodías que definen nuestra identidad cultural.
                </p>
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border-l-8 border-vallenato-blue italic text-gray-600 relative overflow-hidden group">
                    <Quote className="absolute -top-2 -right-2 text-vallenato-beige w-20 h-20 opacity-30 transform rotate-12 transition-transform group-hover:rotate-0 duration-500" />
                    <p className="relative z-10 text-xl leading-relaxed font-serif">
                        "El vallenato no es solo música, es la crónica cantada de un pueblo que ríe, llora y ama a través del acordeón."
                    </p>
                </div>
            </div>
        </div>

        {/* Section 2: Info Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mt-10 mb-20 relative z-20 mx-4 lg:mx-20">
             <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-vallenato-mustard">
                <div className="bg-vallenato-cream w-14 h-14 rounded-full flex items-center justify-center mb-6">
                    <Award className="w-7 h-7 text-vallenato-mustard" />
                </div>
                <h3 className="font-bold text-2xl text-vallenato-blue mb-3 font-serif">Jurado del Festival</h3>
                <p className="text-gray-600">
                    Con un <strong>criterio respetado</strong> por <strong>juglares y novatos</strong>, ha sido designado <strong>11 veces</strong> como jurado en el <strong>Festival de la Leyenda Vallenata</strong>.
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-vallenato-red">
                <div className="bg-red-50 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                    <Mic className="w-7 h-7 text-vallenato-red" />
                </div>
                <h3 className="font-bold text-2xl text-vallenato-blue mb-3 font-serif">Voz Autorizada</h3>
                <p className="text-gray-600">
                    Creador y director del programa "Estampas Vallenatas", una <strong>plataforma radial líder</strong> que se convirtió en <strong>referencia obligada</strong> para la preservación cultural.
                </p>
            </div>
        </div>

        {/* Ask the Author Form Section */}
        <section className="mb-20">
          <div className="bg-vallenato-cream rounded-[2rem] p-8 lg:p-12 shadow-inner border border-vallenato-mustard/20 relative overflow-hidden">
             <div className="absolute -top-10 -right-10 opacity-5">
                <MessageSquareQuote className="w-64 h-64 text-vallenato-blue" />
             </div>

             <div className="relative z-10 max-w-4xl mx-auto">
                <div className="text-center mb-10">
                   <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-4">
                      <Sparkles className="w-6 h-6 text-vallenato-mustard mr-2" />
                      <span className="text-vallenato-blue font-bold uppercase tracking-widest text-xs">Consulta Escrita</span>
                   </div>
                   <h2 className="text-4xl font-serif font-bold text-vallenato-blue mb-4">Pregúntale al Maestro</h2>
                </div>

                <form onSubmit={handleAskQuestion} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-vallenato-mustard transition-colors group-focus-within:text-vallenato-blue">
                            <User size={20} />
                         </div>
                         <input
                            type="text"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Nombre y Apellido"
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-white focus:border-vallenato-mustard focus:ring-0 bg-white shadow-sm text-lg placeholder:text-gray-400 transition-all outline-none"
                         />
                      </div>
                      <div className="relative group">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-vallenato-mustard transition-colors group-focus-within:text-vallenato-blue">
                            <MapPin size={20} />
                         </div>
                         <input
                            type="text"
                            required
                            value={userCity}
                            onChange={(e) => setUserCity(e.target.value)}
                            placeholder="Ciudad y País"
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-white focus:border-vallenato-mustard focus:ring-0 bg-white shadow-sm text-lg placeholder:text-gray-400 transition-all outline-none"
                         />
                      </div>
                   </div>

                   <textarea
                     required
                     value={question}
                     onChange={(e) => setQuestion(e.target.value)}
                     placeholder="Escribe tu pregunta aquí..."
                     className="w-full h-40 p-6 rounded-2xl border-2 border-white focus:border-vallenato-mustard focus:ring-0 bg-white shadow-sm text-lg placeholder:text-gray-400 resize-none transition-all outline-none"
                   />
                   
                   <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex-grow">
                        {submitStatus === 'success' && (
                          <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-100 animate-fade-in-up">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Pregunta enviada correctamente.</span>
                          </div>
                        )}
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={isAsking || !question.trim()}
                        className={`px-10 py-4 rounded-2xl transition-all flex items-center space-x-3 text-lg whitespace-nowrap ${
                          isAsking ? 'bg-gray-200 text-gray-400' : 'bg-vallenato-blue text-white hover:bg-vallenato-red'
                        }`}
                      >
                        {isAsking ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                        <span className="font-bold">Enviar Consulta</span>
                      </button>
                   </div>
                </form>

                {(answer || isAsking) && (
                  <div className="mt-12 animate-fade-in-up">
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-t-8 border-vallenato-mustard relative">
                       <div className="absolute -top-4 left-10 bg-vallenato-mustard text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest">
                          Respuesta del Maestro Álvaro
                       </div>
                       
                       {isAsking ? (
                         <div className="flex flex-col items-center py-10 space-y-4">
                            <div className="flex space-x-2">
                               <div className="w-4 h-4 bg-vallenato-mustard rounded-full animate-bounce"></div>
                               <div className="w-4 h-4 bg-vallenato-mustard rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                               <div className="w-4 h-4 bg-vallenato-mustard rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            </div>
                         </div>
                       ) : (
                         <p className="text-gray-800 text-xl leading-relaxed font-serif whitespace-pre-line italic">"{answer}"</p>
                       )}
                    </div>
                  </div>
                )}
             </div>
          </div>
        </section>

        {/* Section 3: Vision & Secondary Image */}
        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-10 mb-20">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <div className="flex items-center justify-center space-x-3 text-vallenato-blue">
                     <Music className="w-8 h-8" />
                     <h2 className="text-3xl lg:text-4xl font-serif font-bold">Su Visión Cultural</h2>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Su misión trasciende. Álvaro busca garantizar que la riqueza cultural del vallenato repose siempre sobre quien mejor interprete los cuatro aires tradicionales.
                </p>
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border-4 border-vallenato-beige">
                    <img 
                      src={APP_IMAGES.aboutSecondary} 
                      alt="Álvaro González Pimienta junto al gran Luis Enrique Martínez" 
                      className="w-full h-auto object-cover max-h-[600px] object-top" 
                    />
                </div>
                <p className="mt-4 text-center font-serif text-gray-500 italic text-sm tracking-wide">
                  Álvaro González Pimienta junto al gran Luis Enrique Martínez
                </p>
            </div>
        </div>

        {/* Section: Anécdota y Legado */}
        <section className="bg-white p-8 lg:p-16 rounded-[3rem] shadow-2xl border-b-8 border-vallenato-red relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-vallenato-red opacity-20"></div>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-vallenato-red/10 rounded-2xl text-vallenato-red">
                <History className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-vallenato-blue italic">Anécdota y legado</h2>
            </div>
            <div className="space-y-8 text-gray-700 text-lg md:text-xl leading-relaxed font-serif italic">
              <p>
                Sin poder ocultar la nostalgia al recordar el recorrido folclórico que 'Estampas Vallenatas' protagonizó en la radio nacional, Álvaro González afirma que la mayor satisfacción fue llevarle a la población campesina y rural de Colombia un deleite espiritual con música que no habían escuchado anteriormente.
              </p>
              <p>
                En cierta ocasión, programó la canción 'El accidente de Lisandro' y, casi de inmediato, recibió la llamada de un oyente conmovido: "Doctor González, yo pensé que ese tema no lo tenía nadie en Colombia". Años atrás, incluso Eloy 'Chichi' Quintero, desde su rol como Cónsul en Maracaibo, se comunicó con el programa para destacar la inmensa sintonía de 'Estampas Vallenatas' en territorio venezolano.
              </p>
              <div className="bg-vallenato-beige/30 p-8 rounded-3xl border border-vallenato-mustard/10 text-vallenato-blue relative">
                <p className="leading-relaxed">
                  "De la amistad entrañable con <strong>'El Pollo Vallenato', Luís Enrique Martínez</strong>, González Pimienta recuerda que durante la residencia del acordeonero en el sector de <strong>Fontibón</strong>, Luís Enrique salía de correduría y le dejaba instrucciones precisas a su esposa <strong>Rosa</strong> para que llamara al Doctor González, quien le solucionaría lo del <strong>arriendo</strong> (diez mil pesos de la época) mientras durara su recorrido musical. Cuando Luís Enrique regresaba, iba sagradamente a mi oficina a <strong>entregarme el valor de los arriendos</strong> que le había prestado a Rosa; <strong>nunca me aceptó que se los regalara</strong>".
                </p>
              </div>
              <p className="mt-8 text-center font-serif text-gray-500 italic text-sm tracking-wide">
                Extracto de entrevista realizada para la revista del cuadragésimo segundo Festival de la Leyenda Vallenata
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
