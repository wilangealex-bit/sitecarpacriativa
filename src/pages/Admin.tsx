import { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useCatalogStore } from '../store/useCatalogStore';
import { useSiteStore } from '../store/useSiteStore';
import { useServicesStore } from '../store/useServicesStore';
import { useClientsStore } from '../store/useClientsStore';
import { useReviewsStore } from '../store/useReviewsStore';
import { Plus, Trash2, Edit2, Image as ImageIcon, ArrowLeft, Save, Settings, LayoutGrid, Upload, BookOpen, Briefcase, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'catalog' | 'services' | 'clients' | 'reviews' | 'settings'>('portfolio');
  
  // Portfolio State
  const { projects, addProject, updateProject, deleteProject } = usePortfolioStore();
  const [isEditingPortfolio, setIsEditingPortfolio] = useState<number | null>(null);
  const [portfolioFormData, setPortfolioFormData] = useState({
    title: '',
    category: '',
    image: '',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  });

  // Catalog State
  const { items: catalogItems, addItem: addCatalogItem, updateItem: updateCatalogItem, deleteItem: deleteCatalogItem } = useCatalogStore();
  const [isEditingCatalog, setIsEditingCatalog] = useState<number | null>(null);
  const [catalogFormData, setCatalogFormData] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
  });

  // Services State
  const { services, updateService } = useServicesStore();
  const [isEditingService, setIsEditingService] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

  // Clients State
  const { clients, addClient, deleteClient } = useClientsStore();
  const [clientFormData, setClientFormData] = useState({
    name: '',
    logoUrl: '',
  });

  // Reviews State
  const { reviews, addReview, updateReview, deleteReview } = useReviewsStore();
  const [isEditingReview, setIsEditingReview] = useState<string | null>(null);
  const [reviewFormData, setReviewFormData] = useState({
    authorName: '',
    authorPhoto: '',
    rating: 5,
    text: '',
    date: 'Há 1 semana',
  });

  // Site Settings State
  const { settings, updateSettings, updateContact, updateSocial } = useSiteStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/webp', 0.8);
          callback(dataUrl);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingPortfolio) {
      updateProject(isEditingPortfolio, portfolioFormData);
      setIsEditingPortfolio(null);
    } else {
      addProject(portfolioFormData);
    }
    setPortfolioFormData({
      title: '',
      category: '',
      image: '',
      colSpan: 'md:col-span-1',
      rowSpan: 'md:row-span-1',
    });
  };

  const handleEditPortfolio = (project: any) => {
    setIsEditingPortfolio(project.id);
    setPortfolioFormData({
      title: project.title,
      category: project.category,
      image: project.image,
      colSpan: project.colSpan,
      rowSpan: project.rowSpan,
    });
  };

  const handleAddCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingCatalog) {
      updateCatalogItem(isEditingCatalog, catalogFormData);
      setIsEditingCatalog(null);
    } else {
      addCatalogItem(catalogFormData);
    }
    setCatalogFormData({
      title: '',
      category: '',
      image: '',
      description: '',
    });
  };

  const handleEditCatalog = (item: any) => {
    setIsEditingCatalog(item.id);
    setCatalogFormData({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description || '',
    });
  };

  const handleEditService = (service: any) => {
    setIsEditingService(service.id);
    setServiceFormData({
      title: service.title,
      description: service.description,
      image: service.image,
    });
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingService) {
      updateService(isEditingService, serviceFormData);
      setIsEditingService(null);
      setServiceFormData({ title: '', description: '', image: '' });
    }
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    addClient(clientFormData);
    setClientFormData({ name: '', logoUrl: '' });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingReview) {
      updateReview(isEditingReview, reviewFormData);
      setIsEditingReview(null);
    } else {
      addReview(reviewFormData);
    }
    setReviewFormData({ authorName: '', authorPhoto: '', rating: 5, text: '', date: 'Há 1 semana' });
  };

  const handleEditReview = (review: any) => {
    setIsEditingReview(review.id);
    setReviewFormData({
      authorName: review.authorName,
      authorPhoto: review.authorPhoto,
      rating: review.rating,
      text: review.text,
      date: review.date,
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 text-sm uppercase tracking-widest font-bold">
              <ArrowLeft className="w-4 h-4" /> Voltar ao Site
            </Link>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              Painel de <span className="text-blue-400">Controle</span>
            </h1>
            <p className="text-gray-400 mt-2 font-light">Gerencie os projetos do portfólio, catálogos e informações do site.</p>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('portfolio')} 
            className={`flex items-center gap-2 uppercase tracking-widest font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'portfolio' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
          >
            <LayoutGrid className="w-4 h-4" /> Portfólio
          </button>
          <button 
            onClick={() => setActiveTab('catalog')} 
            className={`flex items-center gap-2 uppercase tracking-widest font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'catalog' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
          >
            <BookOpen className="w-4 h-4" /> Catálogos
          </button>
          <button 
            onClick={() => setActiveTab('services')} 
            className={`flex items-center gap-2 uppercase tracking-widest font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'services' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
          >
            <Briefcase className="w-4 h-4" /> Serviços
          </button>
          <button 
            onClick={() => setActiveTab('clients')} 
            className={`flex items-center gap-2 uppercase tracking-widest font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'clients' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
          >
            <Users className="w-4 h-4" /> Clientes
          </button>
          <button 
            onClick={() => setActiveTab('reviews')} 
            className={`flex items-center gap-2 uppercase tracking-widest font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'reviews' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
          >
            <Star className="w-4 h-4" /> Avaliações
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`flex items-center gap-2 uppercase tracking-widest font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'settings' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
          >
            <Settings className="w-4 h-4" /> Configurações do Site
          </button>
        </div>

        {activeTab === 'portfolio' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 sticky top-8">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  {isEditingPortfolio ? <Edit2 className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-blue-400" />}
                  {isEditingPortfolio ? 'Editar Projeto' : 'Novo Projeto'}
                </h2>
                
                <form onSubmit={handleAddPortfolio} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Título</label>
                    <input
                      type="text"
                      required
                      value={portfolioFormData.title}
                      onChange={(e) => setPortfolioFormData({ ...portfolioFormData, title: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Ex: Neon Cyber"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Categoria</label>
                    <input
                      type="text"
                      required
                      value={portfolioFormData.category}
                      onChange={(e) => setPortfolioFormData({ ...portfolioFormData, category: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Ex: Letreiro Luminoso"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">URL da Imagem ou Upload</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={portfolioFormData.image}
                        onChange={(e) => setPortfolioFormData({ ...portfolioFormData, image: e.target.value })}
                        className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="https://..."
                      />
                      <label className="cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl px-4 py-3 flex items-center justify-center transition-colors" title="Fazer Upload">
                        <Upload className="w-5 h-5" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (base64) => setPortfolioFormData({ ...portfolioFormData, image: base64 }))}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Colunas (Desktop)</label>
                      <select
                        value={portfolioFormData.colSpan}
                        onChange={(e) => setPortfolioFormData({ ...portfolioFormData, colSpan: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                      >
                        <option value="md:col-span-1">1 Coluna</option>
                        <option value="md:col-span-2">2 Colunas</option>
                        <option value="md:col-span-3">3 Colunas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Linhas (Desktop)</label>
                      <select
                        value={portfolioFormData.rowSpan}
                        onChange={(e) => setPortfolioFormData({ ...portfolioFormData, rowSpan: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                      >
                        <option value="md:row-span-1">1 Linha</option>
                        <option value="md:row-span-2">2 Linhas</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isEditingPortfolio ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {isEditingPortfolio ? 'Salvar Alterações' : 'Adicionar Projeto'}
                  </button>

                  {isEditingPortfolio && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingPortfolio(null);
                        setPortfolioFormData({ title: '', category: '', image: '', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' });
                      }}
                      className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest py-3 rounded-xl transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-zinc-900/30 border border-white/10 rounded-3xl overflow-hidden group">
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span className="text-blue-400 text-xs font-bold tracking-widest uppercase block mb-1">
                            {project.category}
                          </span>
                          <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between border-t border-white/5 bg-black/20">
                      <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
                        <ImageIcon className="w-4 h-4" />
                        {project.colSpan.replace('md:col-span-', '')}x{project.rowSpan.replace('md:row-span-', '')}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPortfolio(project)}
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 flex items-center justify-center transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {projects.length === 0 && (
                  <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl">
                    <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-light">Nenhum projeto cadastrado.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : activeTab === 'catalog' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Catalog Form */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 sticky top-8">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  {isEditingCatalog ? <Edit2 className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-blue-400" />}
                  {isEditingCatalog ? 'Editar Catálogo' : 'Novo Catálogo'}
                </h2>
                
                <form onSubmit={handleAddCatalog} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Título</label>
                    <input
                      type="text"
                      required
                      value={catalogFormData.title}
                      onChange={(e) => setCatalogFormData({ ...catalogFormData, title: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Ex: Papel de Parede Floral"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Categoria</label>
                    <input
                      type="text"
                      required
                      value={catalogFormData.category}
                      onChange={(e) => setCatalogFormData({ ...catalogFormData, category: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Ex: Papel de Parede"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">URL da Imagem ou Upload</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={catalogFormData.image}
                        onChange={(e) => setCatalogFormData({ ...catalogFormData, image: e.target.value })}
                        className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="https://..."
                      />
                      <label className="cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl px-4 py-3 flex items-center justify-center transition-colors" title="Fazer Upload">
                        <Upload className="w-5 h-5" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (base64) => setCatalogFormData({ ...catalogFormData, image: base64 }))}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Descrição</label>
                    <textarea
                      required
                      value={catalogFormData.description}
                      onChange={(e) => setCatalogFormData({ ...catalogFormData, description: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Descrição do item..."
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isEditingCatalog ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {isEditingCatalog ? 'Salvar Alterações' : 'Adicionar Catálogo'}
                  </button>

                  {isEditingCatalog && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingCatalog(null);
                        setCatalogFormData({ title: '', category: '', image: '', description: '' });
                      }}
                      className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest py-3 rounded-xl transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Catalog List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {catalogItems.map((item) => (
                  <div key={item.id} className="bg-zinc-900/30 border border-white/10 rounded-3xl overflow-hidden group">
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span className="text-blue-400 text-xs font-bold tracking-widest uppercase block mb-1">
                            {item.category}
                          </span>
                          <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between border-t border-white/5 bg-black/20">
                      <p className="text-xs text-gray-400 line-clamp-1 flex-1 mr-4">{item.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCatalog(item)}
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 flex items-center justify-center transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCatalogItem(item.id)}
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {catalogItems.length === 0 && (
                  <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl">
                    <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-light">Nenhum catálogo cadastrado.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : activeTab === 'services' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Services Form */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 sticky top-8">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Edit2 className="w-5 h-5 text-blue-400" />
                  Editar Serviço
                </h2>
                
                {!isEditingService ? (
                  <p className="text-gray-400 text-sm">Selecione um serviço na lista ao lado para editar.</p>
                ) : (
                  <form onSubmit={handleSaveService} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Título</label>
                      <input
                        type="text"
                        required
                        value={serviceFormData.title}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">URL da Imagem de Fundo ou Upload</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={serviceFormData.image}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.value })}
                          className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <label className="cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl px-4 py-3 flex items-center justify-center transition-colors" title="Fazer Upload">
                          <Upload className="w-5 h-5" />
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, (base64) => setServiceFormData({ ...serviceFormData, image: base64 }))}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Descrição</label>
                      <textarea
                        required
                        value={serviceFormData.description}
                        onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        rows={5}
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Salvar Alterações
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingService(null);
                        setServiceFormData({ title: '', description: '', image: '' });
                      }}
                      className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest py-3 rounded-xl transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Services List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="bg-zinc-900/30 border border-white/10 rounded-3xl overflow-hidden group">
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between border-t border-white/5 bg-black/20">
                      <p className="text-xs text-gray-400 line-clamp-1 flex-1 mr-4">{service.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 flex items-center justify-center transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === 'clients' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Clients Form */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 sticky top-8">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-400" />
                  Novo Cliente
                </h2>
                
                <form onSubmit={handleAddClient} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Nome da Empresa</label>
                    <input
                      type="text"
                      required
                      value={clientFormData.name}
                      onChange={(e) => setClientFormData({ ...clientFormData, name: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Ex: Empresa X"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">URL da Logo ou Upload</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={clientFormData.logoUrl}
                        onChange={(e) => setClientFormData({ ...clientFormData, logoUrl: e.target.value })}
                        className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="https://..."
                      />
                      <label className="cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl px-4 py-3 flex items-center justify-center transition-colors" title="Fazer Upload">
                        <Upload className="w-5 h-5" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (base64) => setClientFormData({ ...clientFormData, logoUrl: base64 }))}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Adicionar Cliente
                  </button>
                </form>
              </div>
            </div>

            {/* Clients List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {clients.map((client) => (
                  <div key={client.id} className="bg-zinc-900/30 border border-white/10 rounded-3xl overflow-hidden group flex flex-col items-center justify-center p-6 relative">
                    <div className="h-24 w-full relative flex items-center justify-center mb-4">
                      <img 
                        src={client.logoUrl} 
                        alt={client.name} 
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight text-center">
                      {client.name}
                    </h3>
                    <button
                      onClick={() => deleteClient(client.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {clients.length === 0 && (
                  <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl">
                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-light">Nenhum cliente cadastrado.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : activeTab === 'reviews' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Reviews Form */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 sticky top-8">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  {isEditingReview ? <Edit2 className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-blue-400" />}
                  {isEditingReview ? 'Editar Avaliação' : 'Nova Avaliação'}
                </h2>
                <form onSubmit={handleAddReview} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Nome do Cliente</label>
                    <input
                      type="text"
                      required
                      value={reviewFormData.authorName}
                      onChange={(e) => setReviewFormData({ ...reviewFormData, authorName: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Foto do Cliente (URL)</label>
                    <input
                      type="url"
                      value={reviewFormData.authorPhoto}
                      onChange={(e) => setReviewFormData({ ...reviewFormData, authorPhoto: e.target.value })}
                      placeholder="Deixe em branco para avatar automático"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Nota (1 a 5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        required
                        value={reviewFormData.rating}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, rating: Number(e.target.value) })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Data</label>
                      <input
                        type="text"
                        required
                        value={reviewFormData.date}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, date: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Texto da Avaliação</label>
                    <textarea
                      required
                      rows={4}
                      value={reviewFormData.text}
                      onChange={(e) => setReviewFormData({ ...reviewFormData, text: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {isEditingReview ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {isEditingReview ? 'Salvar Alterações' : 'Adicionar Avaliação'}
                  </button>
                  {isEditingReview && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingReview(null);
                        setReviewFormData({ authorName: '', authorPhoto: '', rating: 5, text: '', date: 'Há 1 semana' });
                      }}
                      className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest py-3 rounded-xl transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-zinc-900/30 border border-white/10 rounded-3xl overflow-hidden p-6 relative">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={review.authorPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.authorName)}&background=random`} 
                        alt={review.authorName} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-white font-bold">{review.authorName}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm italic mb-4 line-clamp-3">"{review.text}"</p>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-white/5">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 flex items-center justify-center transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 flex items-center justify-center transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {reviews.length === 0 && (
                  <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-3xl">
                    <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-light">Nenhuma avaliação cadastrada.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 max-w-4xl">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" /> Informações do Site
            </h2>
            
            <div className="space-y-10">
              {/* Marca */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Marca & Logo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">URL da Logo ou Upload (Opcional)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={settings.logoUrl} 
                        onChange={e => updateSettings({ logoUrl: e.target.value })} 
                        className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                        placeholder="https://..." 
                      />
                      <label className="cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl px-4 py-3 flex items-center justify-center transition-colors" title="Fazer Upload">
                        <Upload className="w-5 h-5" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (base64) => updateSettings({ logoUrl: base64 }))}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Deixe em branco para usar o ícone padrão.</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Foto de Perfil do WhatsApp (Opcional)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={settings.whatsappProfileUrl || ''} 
                        onChange={e => updateSettings({ whatsappProfileUrl: e.target.value })} 
                        className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                        placeholder="https://..." 
                      />
                      <label className="cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl px-4 py-3 flex items-center justify-center transition-colors" title="Fazer Upload">
                        <Upload className="w-5 h-5" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (base64) => updateSettings({ whatsappProfileUrl: base64 }))}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Se vazio, usará a logo do site.</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Imagem de Fundo (Hero) ou Upload</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={settings.heroImage} 
                        onChange={e => updateSettings({ heroImage: e.target.value })} 
                        className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                        placeholder="https://..." 
                      />
                      <label className="cursor-pointer bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-xl px-4 py-3 flex items-center justify-center transition-colors" title="Fazer Upload">
                        <Upload className="w-5 h-5" />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (base64) => updateSettings({ heroImage: base64 }))}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Nome (Parte 1)</label>
                    <input 
                      type="text" 
                      value={settings.brandName} 
                      onChange={e => updateSettings({ brandName: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Nome (Destaque Azul)</label>
                    <input 
                      type="text" 
                      value={settings.brandHighlight} 
                      onChange={e => updateSettings({ brandHighlight: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                </div>
              </div>

              {/* Textos Principais */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Textos Principais (Início)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Título (Linha 1)</label>
                    <input 
                      type="text" 
                      value={settings.heroTitle1} 
                      onChange={e => updateSettings({ heroTitle1: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Título (Destaque Colorido)</label>
                    <input 
                      type="text" 
                      value={settings.heroTitleHighlight} 
                      onChange={e => updateSettings({ heroTitleHighlight: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Título (Linha 3)</label>
                    <input 
                      type="text" 
                      value={settings.heroTitle2} 
                      onChange={e => updateSettings({ heroTitle2: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Subtítulo / Descrição</label>
                  <textarea 
                    value={settings.heroSubtitle} 
                    onChange={e => updateSettings({ heroSubtitle: e.target.value })} 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    rows={3} 
                  />
                </div>
              </div>

              {/* Contato */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">WhatsApp (Apenas números com DDD)</label>
                    <input 
                      type="text" 
                      value={settings.contact.whatsapp} 
                      onChange={e => updateContact({ whatsapp: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                      placeholder="Ex: 5511999999999"
                    />
                    <p className="text-xs text-gray-500 mt-2">Usado para o botão flutuante.</p>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Telefone (Exibição no Rodapé)</label>
                    <input 
                      type="text" 
                      value={settings.contact.phone} 
                      onChange={e => updateContact({ phone: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">E-mail</label>
                    <input 
                      type="email" 
                      value={settings.contact.email} 
                      onChange={e => updateContact({ email: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Endereço</label>
                    <textarea 
                      value={settings.contact.address} 
                      onChange={e => updateContact({ address: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                      rows={2} 
                    />
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Redes Sociais (Links)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Instagram</label>
                    <input 
                      type="url" 
                      value={settings.social.instagram} 
                      onChange={e => updateSocial({ instagram: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Facebook</label>
                    <input 
                      type="url" 
                      value={settings.social.facebook} 
                      onChange={e => updateSocial({ facebook: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">LinkedIn</label>
                    <input 
                      type="url" 
                      value={settings.social.linkedin} 
                      onChange={e => updateSocial({ linkedin: e.target.value })} 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
