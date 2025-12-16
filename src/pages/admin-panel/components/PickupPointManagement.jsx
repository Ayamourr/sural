import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PickupPointManagement = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [selectedPoint, setSelectedPoint] = useState(null);

  const translations = {
    en: {
      title: 'Pickup Point Management',
      searchPlaceholder: 'Search pickup points...',
      filterCity: 'Filter by City',
      all: 'All',
      addNew: 'Add New Point',
      pointName: 'Point Name',
      address: 'Address',
      city: 'City',
      capacity: 'Capacity',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      viewMap: 'View Map',
      schedule: 'Schedule',
      noPoints: 'No pickup points found',
      coordinates: 'Coordinates',
      operatingHours: 'Operating Hours',
      contactPerson: 'Contact Person',
      phone: 'Phone',
      closeDetails: 'Close',
    },
    ru: {
      title: 'Управление пунктами выдачи',
      searchPlaceholder: 'Поиск пунктов выдачи...',
      filterCity: 'Фильтр по городу',
      all: 'Все',
      addNew: 'Добавить новый',
      pointName: 'Название',
      address: 'Адрес',
      city: 'Город',
      capacity: 'Вместимость',
      status: 'Статус',
      actions: 'Действия',
      active: 'Активен',
      inactive: 'Неактивен',
      edit: 'Редактировать',
      viewMap: 'Карта',
      schedule: 'Расписание',
      noPoints: 'Пункты выдачи не найдены',
      coordinates: 'Координаты',
      operatingHours: 'Часы работы',
      contactPerson: 'Контактное лицо',
      phone: 'Телефон',
      closeDetails: 'Закрыть',
    },
  };

  const t = translations?.[language];

  const mockPickupPoints = [
    {
      id: 'PP001',
      name: 'Центральный пункт выдачи',
      address: 'ул. Абая, 150',
      city: 'Алматы',
      coordinates: { lat: 43.2220, lng: 76.8512 },
      capacity: 500,
      currentLoad: 342,
      status: 'active',
      operatingHours: '09:00 - 21:00',
      contactPerson: 'Айгуль Нурсултанова',
      phone: '+7 (777) 123-4567',
    },
    {
      id: 'PP002',
      name: 'Северный филиал',
      address: 'пр. Достык, 234',
      city: 'Алматы',
      coordinates: { lat: 43.2630, lng: 76.9286 },
      capacity: 300,
      currentLoad: 187,
      status: 'active',
      operatingHours: '10:00 - 20:00',
      contactPerson: 'Дмитрий Петров',
      phone: '+7 (777) 234-5678',
    },
    {
      id: 'PP003',
      name: 'Пункт выдачи Астана',
      address: 'ул. Кабанбай батыра, 45',
      city: 'Астана',
      coordinates: { lat: 51.1694, lng: 71.4491 },
      capacity: 400,
      currentLoad: 256,
      status: 'active',
      operatingHours: '09:00 - 22:00',
      contactPerson: 'Марат Алиев',
      phone: '+7 (777) 345-6789',
    },
    {
      id: 'PP004',
      name: 'Южный пункт',
      address: 'ул. Толе би, 89',
      city: 'Алматы',
      coordinates: { lat: 43.2567, lng: 76.9286 },
      capacity: 250,
      currentLoad: 98,
      status: 'inactive',
      operatingHours: '10:00 - 19:00',
      contactPerson: 'Асель Жумабаева',
      phone: '+7 (777) 456-7890',
    },
  ];

  const cityOptions = [
    { value: 'all', label: t?.all },
    { value: 'Алматы', label: 'Алматы' },
    { value: 'Астана', label: 'Астана' },
  ];

  const filteredPoints = mockPickupPoints?.filter(point => {
    const matchesSearch = point?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         point?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         point?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCity = filterCity === 'all' || point?.city === filterCity;
    return matchesSearch && matchesCity;
  });

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground';
  };

  const getCapacityColor = (current, total) => {
    const percentage = (current / total) * 100;
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
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
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
              <Select
                options={cityOptions}
                value={filterCity}
                onChange={setFilterCity}
                placeholder={t?.filterCity}
                className="w-full sm:w-40"
              />
              <Button variant="default" iconName="Plus">
                {t?.addNew}
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t?.pointName}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t?.address}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t?.city}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t?.capacity}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t?.status}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t?.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPoints?.length > 0 ? (
                filteredPoints?.map((point) => (
                  <tr key={point?.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{point?.name}</p>
                        <p className="text-xs text-muted-foreground">{point?.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground">{point?.address}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground">{point?.city}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-foreground">{point?.currentLoad} / {point?.capacity}</p>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getCapacityColor(point?.currentLoad, point?.capacity)} transition-all`}
                            style={{ width: `${(point?.currentLoad / point?.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(point?.status)}`}>
                        {t?.[point?.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="MapPin"
                          onClick={() => setSelectedPoint(point)}
                        >
                          {t?.viewMap}
                        </Button>
                        <Button variant="ghost" size="sm" iconName="Edit">
                          {t?.edit}
                        </Button>
                        <Button variant="ghost" size="sm" iconName="Calendar">
                          {t?.schedule}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Icon name="MapPin" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">{t?.noPoints}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedPoint && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">{selectedPoint?.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setSelectedPoint(null)}
              />
            </div>
            <div className="p-6 space-y-6">
              <div className="w-full h-96 rounded-lg overflow-hidden bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={selectedPoint?.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${selectedPoint?.coordinates?.lat},${selectedPoint?.coordinates?.lng}&z=14&output=embed`}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{t?.address}</p>
                  <p className="text-sm text-foreground">{selectedPoint?.address}, {selectedPoint?.city}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{t?.coordinates}</p>
                  <p className="text-sm text-foreground">{selectedPoint?.coordinates?.lat}, {selectedPoint?.coordinates?.lng}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{t?.operatingHours}</p>
                  <p className="text-sm text-foreground">{selectedPoint?.operatingHours}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{t?.capacity}</p>
                  <p className="text-sm text-foreground">{selectedPoint?.currentLoad} / {selectedPoint?.capacity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{t?.contactPerson}</p>
                  <p className="text-sm text-foreground">{selectedPoint?.contactPerson}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{t?.phone}</p>
                  <p className="text-sm text-foreground">{selectedPoint?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupPointManagement;