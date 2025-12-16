import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ProductModerationQueue = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const translations = {
    en: {
      title: 'Product Request Moderation',
      searchPlaceholder: 'Search requests...',
      filterStatus: 'Filter by Status',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      all: 'All',
      requestId: 'Request ID',
      productName: 'Product Name',
      category: 'Category',
      submittedBy: 'Submitted By',
      submittedOn: 'Submitted On',
      votes: 'Votes',
      status: 'Status',
      actions: 'Actions',
      approve: 'Approve',
      reject: 'Reject',
      viewDetails: 'View Details',
      similarRequests: 'Similar Requests',
      contentGuidelines: 'Content Guidelines',
      description: 'Description',
      images: 'Images',
      noRequests: 'No requests found',
      duplicateDetected: 'Possible Duplicate',
      aiSuggestion: 'AI Suggestion',
      closeDetails: 'Close Details'
    },
    ru: {
      title: 'Модерация запросов продуктов',
      searchPlaceholder: 'Поиск запросов...',
      filterStatus: 'Фильтр по статусу',
      pending: 'На рассмотрении',
      approved: 'Одобрено',
      rejected: 'Отклонено',
      all: 'Все',
      requestId: 'ID запроса',
      productName: 'Название продукта',
      category: 'Категория',
      submittedBy: 'Отправитель',
      submittedOn: 'Дата отправки',
      votes: 'Голоса',
      status: 'Статус',
      actions: 'Действия',
      approve: 'Одобрить',
      reject: 'Отклонить',
      viewDetails: 'Подробнее',
      similarRequests: 'Похожие запросы',
      contentGuidelines: 'Правила контента',
      description: 'Описание',
      images: 'Изображения',
      noRequests: 'Запросы не найдены',
      duplicateDetected: 'Возможный дубликат',
      aiSuggestion: 'Предложение AI',
      closeDetails: 'Закрыть'
    }
  };

  const t = translations?.[language];

  const mockRequests = [
  {
    id: 'REQ001',
    productName: 'Беспроводные наушники Sony WH-1000XM5',
    category: 'Электроника',
    description: 'Премиальные беспроводные наушники с активным шумоподавлением и высоким качеством звука для профессионального использования',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13e126511-1765030295691.png",
    imageAlt: 'Black wireless over-ear headphones with silver accents on white background',
    submittedBy: 'Айгуль Нурсултанова',
    submittedOn: '2025-12-15',
    votes: 127,
    status: 'pending',
    isDuplicate: false,
    aiSuggestion: 'High-quality request with detailed description. No similar products found.'
  },
  {
    id: 'REQ002',
    productName: 'Умные часы Apple Watch Series 9',
    category: 'Электроника',
    description: 'Новейшие умные часы с расширенными функциями здоровья и фитнеса',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd51548c-1764641911784.png",
    imageAlt: 'Silver smartwatch with black band displaying fitness metrics on screen',
    submittedBy: 'Дмитрий Петров',
    submittedOn: '2025-12-14',
    votes: 89,
    status: 'pending',
    isDuplicate: true,
    aiSuggestion: 'Similar request exists: REQ045 - Apple Watch Series 8. Consider merging votes.'
  },
  {
    id: 'REQ003',
    productName: 'Механическая клавиатура Keychron K8',
    category: 'Аксессуары',
    description: 'Компактная механическая клавиатура с RGB подсветкой для работы и игр',
    image: "https://images.unsplash.com/photo-1616836417940-8898b8ef794d",
    imageAlt: 'Black mechanical keyboard with colorful RGB backlit keys on dark desk',
    submittedBy: 'Марат Алиев',
    submittedOn: '2025-12-13',
    votes: 64,
    status: 'pending',
    isDuplicate: false,
    aiSuggestion: 'Well-described product. Category appropriate. Ready for approval.'
  },
  {
    id: 'REQ004',
    productName: 'Портативная колонка JBL Charge 5',
    category: 'Электроника',
    description: 'Водонепроницаемая портативная колонка с мощным звуком и долгим временем работы',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aae88582-1764660840888.png",
    imageAlt: 'Blue cylindrical portable Bluetooth speaker with rubber exterior on wooden surface',
    submittedBy: 'Асель Жумабаева',
    submittedOn: '2025-12-12',
    votes: 52,
    status: 'approved',
    isDuplicate: false,
    aiSuggestion: 'Approved based on high demand and clear specifications.'
  }];


  const statusOptions = [
  { value: 'all', label: t?.all },
  { value: 'pending', label: t?.pending },
  { value: 'approved', label: t?.approved },
  { value: 'rejected', label: t?.rejected }];


  const filteredRequests = mockRequests?.filter((request) => {
    const matchesSearch = request?.productName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    request?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'approved':
        return 'bg-success/10 text-success';
      case 'rejected':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-xl font-semibold text-foreground">{t?.title}</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 sm:flex-initial sm:w-80">
                <Input
                  type="search"
                  placeholder={t?.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)} />

              </div>
              <Select
                options={statusOptions}
                value={filterStatus}
                onChange={setFilterStatus}
                placeholder={t?.filterStatus}
                className="w-full sm:w-40" />

            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredRequests?.length > 0 ?
          filteredRequests?.map((request) =>
          <div key={request?.id} className="p-6 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                  src={request?.image}
                  alt={request?.imageAlt}
                  className="w-full h-full object-cover" />

                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">{request?.productName}</h3>
                          {request?.isDuplicate &&
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
                              <Icon name="AlertTriangle" size={12} />
                              {t?.duplicateDetected}
                            </span>
                      }
                        </div>
                        <p className="text-sm text-muted-foreground">{request?.id} • {request?.category}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request?.status)}`}>
                        {t?.[request?.status]}
                      </span>
                    </div>

                    <p className="text-sm text-foreground line-clamp-2">{request?.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="User" size={16} />
                        <span>{request?.submittedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={16} />
                        <span>{request?.submittedOn}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="ThumbsUp" size={16} />
                        <span>{request?.votes} {t?.votes}</span>
                      </div>
                    </div>

                    {request?.aiSuggestion &&
                <div className="flex items-start gap-2 p-3 bg-accent/5 rounded-lg border border-accent/20">
                        <Icon name="Sparkles" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-accent mb-1">{t?.aiSuggestion}</p>
                          <p className="text-xs text-muted-foreground">{request?.aiSuggestion}</p>
                        </div>
                      </div>
                }

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                    variant="default"
                    size="sm"
                    iconName="Check"
                    disabled={request?.status !== 'pending'}>

                        {t?.approve}
                      </Button>
                      <Button
                    variant="destructive"
                    size="sm"
                    iconName="X"
                    disabled={request?.status !== 'pending'}>

                        {t?.reject}
                      </Button>
                      <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    onClick={() => setSelectedRequest(request)}>

                        {t?.viewDetails}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
          ) :

          <div className="p-12 text-center">
              <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t?.noRequests}</p>
            </div>
          }
        </div>
      </div>
      {selectedRequest &&
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{t?.viewDetails}</h3>
              <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setSelectedRequest(null)} />

            </div>
            <div className="p-6 space-y-4">
              <div className="w-full h-64 rounded-lg overflow-hidden bg-muted">
                <Image
                src={selectedRequest?.image}
                alt={selectedRequest?.imageAlt}
                className="w-full h-full object-cover" />

              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{selectedRequest?.productName}</h4>
                <p className="text-sm text-muted-foreground mb-4">{selectedRequest?.id} • {selectedRequest?.category}</p>
                <p className="text-sm text-foreground">{selectedRequest?.description}</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default ProductModerationQueue;