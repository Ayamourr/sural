import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementTable = ({ language }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const translations = {
    en: {
      title: 'User Management',
      searchPlaceholder: 'Search by name, email, or ID...',
      filterRole: 'Filter by Role',
      filterStatus: 'Filter by Status',
      bulkActions: 'Bulk Actions',
      selectAll: 'Select All',
      selectedCount: 'selected',
      activate: 'Activate',
      deactivate: 'Deactivate',
      delete: 'Delete',
      export: 'Export',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      registered: 'Registered',
      lastActive: 'Last Active',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      suspended: 'Suspended',
      consumer: 'Consumer',
      business: 'Business',
      courier: 'Courier',
      admin: 'Admin',
      all: 'All',
      edit: 'Edit',
      view: 'View',
      suspend: 'Suspend',
      showing: 'Showing',
      of: 'of',
      users: 'users',
      previous: 'Previous',
      next: 'Next'
    },
    ru: {
      title: 'Управление пользователями',
      searchPlaceholder: 'Поиск по имени, email или ID...',
      filterRole: 'Фильтр по роли',
      filterStatus: 'Фильтр по статусу',
      bulkActions: 'Массовые действия',
      selectAll: 'Выбрать все',
      selectedCount: 'выбрано',
      activate: 'Активировать',
      deactivate: 'Деактивировать',
      delete: 'Удалить',
      export: 'Экспорт',
      name: 'Имя',
      email: 'Email',
      role: 'Роль',
      status: 'Статус',
      registered: 'Регистрация',
      lastActive: 'Последняя активность',
      actions: 'Действия',
      active: 'Активен',
      inactive: 'Неактивен',
      suspended: 'Заблокирован',
      consumer: 'Потребитель',
      business: 'Бизнес',
      courier: 'Курьер',
      admin: 'Администратор',
      all: 'Все',
      edit: 'Редактировать',
      view: 'Просмотр',
      suspend: 'Заблокировать',
      showing: 'Показано',
      of: 'из',
      users: 'пользователей',
      previous: 'Назад',
      next: 'Вперед'
    }
  };

  const t = translations?.[language];

  const mockUsers = [
  {
    id: 'USR001',
    name: 'Айгуль Нурсултанова',
    email: 'aigul.nursultanova@example.kz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16faf2e77-1763294560396.png",
    avatarAlt: 'Professional headshot of Kazakh woman with long dark hair wearing blue blazer',
    role: 'consumer',
    status: 'active',
    registered: '2024-01-15',
    lastActive: '2025-12-16 15:30'
  },
  {
    id: 'USR002',
    name: 'Дмитрий Петров',
    email: 'dmitry.petrov@business.kz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_187ac2848-1764684680250.png",
    avatarAlt: 'Professional headshot of Slavic man with short brown hair in gray suit',
    role: 'business',
    status: 'active',
    registered: '2024-02-20',
    lastActive: '2025-12-16 14:15'
  },
  {
    id: 'USR003',
    name: 'Асель Жумабаева',
    email: 'asel.zhumabayeva@courier.kz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e283a179-1763298142070.png",
    avatarAlt: 'Professional headshot of young Kazakh woman with black hair in ponytail wearing red shirt',
    role: 'courier',
    status: 'active',
    registered: '2024-03-10',
    lastActive: '2025-12-16 16:45'
  },
  {
    id: 'USR004',
    name: 'Марат Алиев',
    email: 'marat.aliyev@example.kz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7d565cb-1763295596132.png",
    avatarAlt: 'Professional headshot of Kazakh man with short black hair wearing white shirt',
    role: 'consumer',
    status: 'inactive',
    registered: '2024-04-05',
    lastActive: '2025-12-10 10:20'
  },
  {
    id: 'USR005',
    name: 'Елена Смирнова',
    email: 'elena.smirnova@business.kz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9d00cbc-1763296697107.png",
    avatarAlt: 'Professional headshot of blonde woman with shoulder-length hair in black blazer',
    role: 'business',
    status: 'suspended',
    registered: '2024-05-12',
    lastActive: '2025-12-08 09:15'
  },
  {
    id: 'USR006',
    name: 'Нурлан Касымов',
    email: 'nurlan.kasymov@example.kz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ebb03a41-1763292034510.png",
    avatarAlt: 'Professional headshot of middle-aged Kazakh man with glasses wearing blue shirt',
    role: 'consumer',
    status: 'active',
    registered: '2024-06-18',
    lastActive: '2025-12-16 13:00'
  },
  {
    id: 'USR007',
    name: 'Анна Ковалева',
    email: 'anna.kovaleva@courier.kz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a943f237-1763294061669.png",
    avatarAlt: 'Professional headshot of young woman with brown hair in bun wearing green top',
    role: 'courier',
    status: 'active',
    registered: '2024-07-22',
    lastActive: '2025-12-16 15:50'
  },
  {
    id: 'USR008',
    name: 'Ержан Сапаров',
    email: 'yerzhan.saparov@admin.kz',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c10a621b-1763292054615.png",
    avatarAlt: 'Professional headshot of Kazakh man with short hair wearing formal black suit',
    role: 'admin',
    status: 'active',
    registered: '2024-01-01',
    lastActive: '2025-12-16 17:00'
  }];


  const roleOptions = [
  { value: 'all', label: t?.all },
  { value: 'consumer', label: t?.consumer },
  { value: 'business', label: t?.business },
  { value: 'courier', label: t?.courier },
  { value: 'admin', label: t?.admin }];


  const statusOptions = [
  { value: 'all', label: t?.all },
  { value: 'active', label: t?.active },
  { value: 'inactive', label: t?.inactive },
  { value: 'suspended', label: t?.suspended }];


  const filteredUsers = mockUsers?.filter((user) => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    user?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesRole = filterRole === 'all' || user?.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user?.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(paginatedUsers?.map((u) => u?.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers?.filter((id) => id !== userId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'suspended':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-error/10 text-error';
      case 'business':
        return 'bg-primary/10 text-primary';
      case 'courier':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-secondary/10 text-secondary';
    }
  };

  return (
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
              options={roleOptions}
              value={filterRole}
              onChange={setFilterRole}
              placeholder={t?.filterRole}
              className="w-full sm:w-40" />

            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder={t?.filterStatus}
              className="w-full sm:w-40" />

          </div>
        </div>

        {selectedUsers?.length > 0 &&
        <div className="mt-4 flex flex-wrap items-center gap-3 p-3 bg-primary/5 rounded-lg">
            <span className="text-sm font-medium text-foreground">
              {selectedUsers?.length} {t?.selectedCount}
            </span>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" iconName="Check">
                {t?.activate}
              </Button>
              <Button variant="outline" size="sm" iconName="X">
                {t?.deactivate}
              </Button>
              <Button variant="destructive" size="sm" iconName="Trash2">
                {t?.delete}
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                {t?.export}
              </Button>
            </div>
          </div>
        }
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left">
                <Checkbox
                  checked={selectedUsers?.length === paginatedUsers?.length && paginatedUsers?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)} />

              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t?.name}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t?.email}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t?.role}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t?.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t?.lastActive}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t?.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedUsers?.map((user) =>
            <tr key={user?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <Checkbox
                  checked={selectedUsers?.includes(user?.id)}
                  onChange={(e) => handleSelectUser(user?.id, e?.target?.checked)} />

                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                    src={user?.avatar}
                    alt={user?.avatarAlt}
                    className="w-10 h-10 rounded-full object-cover" />

                    <div>
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">{user?.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                    {t?.[user?.role]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                    {t?.[user?.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">{user?.lastActive}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      {t?.view}
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Edit">
                      {t?.edit}
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Ban">
                      {t?.suspend}
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {t?.showing} {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers?.length)} {t?.of} {filteredUsers?.length} {t?.users}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            iconName="ChevronLeft">

            {t?.previous}
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) =>
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentPage(page)}>

                {page}
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            iconName="ChevronRight"
            iconPosition="right">

            {t?.next}
          </Button>
        </div>
      </div>
    </div>);

};

export default UserManagementTable;