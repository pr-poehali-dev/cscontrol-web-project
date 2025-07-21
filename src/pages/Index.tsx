import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Hall {
  id: number;
  name: string;
  online: boolean;
  sessionActive: boolean;
}

interface Task {
  id: number;
  title: string;
  description: string;
  location: string;
  urgent: boolean;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  role: string;
  position: string;
  birthday: string;
  online: boolean;
  password: string;
}

interface WarehouseItem {
  id: number;
  name: string;
  quantity: number;
  category: string;
}

interface Lamp {
  id: number;
  hallId: number;
  name: string;
  installDate: string;
  workingHours: number;
  maxHours: number;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string>('admin');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [halls, setHalls] = useState<Hall[]>([
    { id: 1, name: 'Зал 1', online: true, sessionActive: false },
    { id: 2, name: 'Зал 2', online: true, sessionActive: true },
    { id: 3, name: 'Зал 3', online: false, sessionActive: false },
    { id: 4, name: 'Зал 4', online: true, sessionActive: true },
    { id: 5, name: 'Зал 5', online: true, sessionActive: false },
    { id: 6, name: 'Зал 6', online: true, sessionActive: true },
    { id: 7, name: 'Зал 7', online: false, sessionActive: false },
    { id: 8, name: 'Зал 8', online: true, sessionActive: false },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Проверить проектор', description: 'Зал 3 - проблемы с изображением', location: 'Зал 3', urgent: true, completed: false },
    { id: 2, title: 'Заменить лампу', description: 'Зал 1 - лампа требует замены', location: 'Зал 1', urgent: false, completed: false },
    { id: 3, title: 'Убрать в фойе', description: 'Общая уборка после сеанса', location: 'Фойе', urgent: false, completed: false },
  ]);

  const [selectedHall, setSelectedHall] = useState<number | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    location: '',
    urgent: false
  });

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Администратор', role: 'admin', position: 'Главный администратор', birthday: '1985-05-15', online: true, password: '0000' },
    { id: 2, name: 'Иван Петров', role: 'operator', position: 'Оператор зала', birthday: '1990-08-20', online: false, password: '1234' },
    { id: 3, name: 'Мария Сидорова', role: 'tech', position: 'Технический специалист', birthday: '1988-12-10', online: true, password: '5678' },
  ]);

  const [warehouse, setWarehouse] = useState<WarehouseItem[]>([
    { id: 1, name: 'Лампа проектора EPSON', quantity: 5, category: 'Лампы' },
    { id: 2, name: 'Лампа проектора SONY', quantity: 3, category: 'Лампы' },
    { id: 3, name: 'Кабель HDMI', quantity: 15, category: 'Кабели' },
    { id: 4, name: 'Пульт управления', quantity: 8, category: 'Аксессуары' },
  ]);

  const [lamps, setLamps] = useState<Lamp[]>([
    { id: 1, hallId: 1, name: 'Лампа проектора EPSON', installDate: '2024-01-15', workingHours: 1650, maxHours: 1700 },
    { id: 2, hallId: 2, name: 'Лампа проектора SONY', installDate: '2024-02-20', workingHours: 800, maxHours: 1500 },
    { id: 3, hallId: 3, name: 'Лампа проектора EPSON', installDate: '2024-03-10', workingHours: 1200, maxHours: 1700 },
    { id: 4, hallId: 4, name: 'Лампа проектора SONY', installDate: '2024-01-30', workingHours: 1450, maxHours: 1500 },
    { id: 5, hallId: 5, name: 'Лампа проектора EPSON', installDate: '2024-04-05', workingHours: 900, maxHours: 1700 },
    { id: 6, hallId: 6, name: 'Лампа проектора SONY', installDate: '2024-02-15', workingHours: 1100, maxHours: 1500 },
    { id: 7, hallId: 7, name: 'Лампа проектора EPSON', installDate: '2024-03-25', workingHours: 600, maxHours: 1700 },
    { id: 8, hallId: 8, name: 'Лампа проектора SONY', installDate: '2024-04-10', workingHours: 300, maxHours: 1500 },
  ]);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false);
  const [newWarehouseItem, setNewWarehouseItem] = useState({ name: '', quantity: 0, category: '' });
  const [newUser, setNewUser] = useState({ name: '', role: '', position: '', birthday: '', password: '' });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSession = (hallId: number) => {
    setHalls(halls.map(hall => 
      hall.id === hallId ? { ...hall, sessionActive: !hall.sessionActive } : hall
    ));
  };

  const addTask = () => {
    if (newTask.title && newTask.description) {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        location: newTask.location,
        urgent: newTask.urgent,
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', location: '', urgent: false });
      setIsAddTaskOpen(false);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.urgent && !b.urgent) return -1;
    if (!a.urgent && b.urgent) return 1;
    return a.id - b.id;
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">CScontrol Web</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={setCurrentUser}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите пользователя" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Администратор</SelectItem>
                <SelectItem value="operator">Оператор</SelectItem>
                <SelectItem value="tech">Техник</SelectItem>
              </SelectContent>
            </Select>
            <Input type="password" placeholder="Пароль" defaultValue="0000" />
            <Button className="w-full" onClick={() => setCurrentUser('admin')}>
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Icon name="Clapperboard" size={32} className="text-primary" />
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
              CScontrol Web
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Пользователь: {currentUser === 'admin' ? 'Администратор' : 'Оператор'}
            </span>
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={16} />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="halls" className="w-full">
          <TabsList className={`grid w-full ${currentUser === 'admin' ? 'grid-cols-6' : 'grid-cols-3'} mb-8`}>
            <TabsTrigger value="halls" className="flex items-center space-x-2">
              <Icon name="Building2" size={16} />
              <span>Залы</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={16} />
              <span>Задачи</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Icon name="Settings" size={16} />
              <span>Настройки</span>
            </TabsTrigger>
            {currentUser === 'admin' && (
              <>
                <TabsTrigger value="users" className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span>Пользователи</span>
                </TabsTrigger>
                <TabsTrigger value="warehouse" className="flex items-center space-x-2">
                  <Icon name="Package" size={16} />
                  <span>Склад</span>
                </TabsTrigger>
                <TabsTrigger value="lamps" className="flex items-center space-x-2">
                  <Icon name="Lightbulb" size={16} />
                  <span>Учёт ламп</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Halls Tab */}
          <TabsContent value="halls" className="space-y-6">
            {selectedHall ? (
              <div className="space-y-6">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedHall(null)}
                  className="mb-4"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Назад к списку залов
                </Button>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Зал {selectedHall}
                      <Badge className={`ml-4 ${halls.find(h => h.id === selectedHall)?.online ? 'bg-green-500' : 'bg-red-500'}`}>
                        {halls.find(h => h.id === selectedHall)?.online ? 'В сети' : 'Оффлайн'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button 
                        variant="default"
                        onClick={() => setHalls(halls.map(hall => 
                          hall.id === selectedHall ? { ...hall, sessionActive: true } : hall
                        ))}
                        className="h-16"
                      >
                        <Icon name="Play" size={20} />
                        Включить сеанс
                      </Button>
                      
                      <Button 
                        variant="destructive"
                        onClick={() => setHalls(halls.map(hall => 
                          hall.id === selectedHall ? { ...hall, sessionActive: false } : hall
                        ))}
                        className="h-16"
                      >
                        <Icon name="Square" size={20} />
                        Выключить сеанс
                      </Button>
                      
                      <Button variant="secondary" className="h-16">
                        <Icon name="Volume2" size={20} />
                        Звук 3.5
                      </Button>
                      
                      <Button variant="secondary" className="h-16">
                        <Icon name="Volume2" size={20} />
                        Звук 4.0
                      </Button>
                      
                      <Button variant="secondary" className="h-16">
                        <Icon name="Volume2" size={20} />
                        Звук 4.5
                      </Button>
                      
                      <Button variant="outline" className="h-16">
                        <Icon name="Lightbulb" size={20} />
                        Свет включить
                      </Button>
                      
                      <Button variant="outline" className="h-16">
                        <Icon name="LightbulbOff" size={20} />
                        Свет выключить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {halls.map((hall) => (
                  <Card 
                    key={hall.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                    onClick={() => setSelectedHall(hall.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{hall.name}</CardTitle>
                        <div className={`w-3 h-3 rounded-full ${hall.online ? 'bg-green-500' : 'bg-red-500'}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant={hall.online ? "default" : "destructive"}>
                          {hall.online ? 'В сети' : 'Оффлайн'}
                        </Badge>
                        <Badge variant={hall.sessionActive ? "default" : "secondary"}>
                          {hall.sessionActive ? 'Сеанс идёт' : 'Сеанс остановлен'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Задачи</h2>
              <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={16} />
                    Добавить задачу
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Добавить новую задачу</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Название задачи"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                    <Textarea
                      placeholder="Описание задачи"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    />
                    <Select onValueChange={(value) => setNewTask({...newTask, location: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите место" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Фойе">Фойе</SelectItem>
                        <SelectItem value="Бар">Бар</SelectItem>
                        {halls.map((hall) => (
                          <SelectItem key={hall.id} value={`Зал ${hall.id}`}>
                            Зал {hall.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newTask.urgent}
                        onCheckedChange={(checked) => setNewTask({...newTask, urgent: checked})}
                      />
                      <span>Срочная задача</span>
                    </div>
                    <Button onClick={addTask} className="w-full">
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {sortedTasks.map((task) => (
                <Card key={task.id} className={task.urgent ? 'border-red-500' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{task.title}</h3>
                          {task.urgent && (
                            <Badge variant="destructive">Срочно</Badge>
                          )}
                          <Badge variant="outline">{task.location}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      </div>
                      <Badge variant={task.completed ? "default" : "secondary"}>
                        {task.completed ? 'Выполнено' : 'В работе'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Профиль пользователя</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Пользователь</label>
                  <p className="text-lg">{currentUser === 'admin' ? 'Администратор' : 'Оператор'}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Тёмная тема</label>
                  <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                </div>

                <Button variant="outline" disabled>
                  Изменить пароль
                </Button>

                <Button variant="outline" onClick={() => setCurrentUser('')}>
                  Выйти
                </Button>
              </CardContent>
            </Card>

            {currentUser === 'admin' && (
              <Card>
                <CardHeader>
                  <CardTitle>Панель администратора</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Дополнительные функции администратора доступны в соответствующих вкладках.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Users Tab */}
          {currentUser === 'admin' && (
            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Управление пользователями</h2>
                <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" size={16} />
                      Добавить пользователя
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавить нового пользователя</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="ФИО"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      />
                      <Select onValueChange={(value) => setNewUser({...newUser, role: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Роль" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Администратор</SelectItem>
                          <SelectItem value="operator">Оператор</SelectItem>
                          <SelectItem value="tech">Техник</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Должность"
                        value={newUser.position}
                        onChange={(e) => setNewUser({...newUser, position: e.target.value})}
                      />
                      <Input
                        type="date"
                        placeholder="День рождения"
                        value={newUser.birthday}
                        onChange={(e) => setNewUser({...newUser, birthday: e.target.value})}
                      />
                      <Input
                        placeholder="Пароль"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      />
                      <Button 
                        onClick={() => {
                          if (newUser.name && newUser.role && newUser.position && newUser.password) {
                            setUsers([...users, {
                              id: users.length + 1,
                              name: newUser.name,
                              role: newUser.role,
                              position: newUser.position,
                              birthday: newUser.birthday,
                              online: false,
                              password: newUser.password
                            }]);
                            setNewUser({ name: '', role: '', position: '', birthday: '', password: '' });
                            setIsAddUserOpen(false);
                          }
                        }} 
                        className="w-full"
                      >
                        Добавить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {users.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{user.name}</h3>
                            <Badge className={user.online ? 'bg-green-500' : 'bg-gray-500'}>
                              {user.online ? 'Онлайн' : 'Оффлайн'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{user.position}</p>
                          <p className="text-sm text-muted-foreground">День рождения: {user.birthday}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}

          {/* Warehouse Tab */}
          {currentUser === 'admin' && (
            <TabsContent value="warehouse" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Склад</h2>
                <Dialog open={isAddWarehouseOpen} onOpenChange={setIsAddWarehouseOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" size={16} />
                      Добавить товар
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавить товар на склад</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Название товара"
                        value={newWarehouseItem.name}
                        onChange={(e) => setNewWarehouseItem({...newWarehouseItem, name: e.target.value})}
                      />
                      <Input
                        type="number"
                        placeholder="Количество"
                        value={newWarehouseItem.quantity}
                        onChange={(e) => setNewWarehouseItem({...newWarehouseItem, quantity: parseInt(e.target.value) || 0})}
                      />
                      <Select onValueChange={(value) => setNewWarehouseItem({...newWarehouseItem, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Категория" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Лампы">Лампы</SelectItem>
                          <SelectItem value="Кабели">Кабели</SelectItem>
                          <SelectItem value="Аксессуары">Аксессуары</SelectItem>
                          <SelectItem value="Оборудование">Оборудование</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        onClick={() => {
                          if (newWarehouseItem.name && newWarehouseItem.quantity > 0 && newWarehouseItem.category) {
                            setWarehouse([...warehouse, {
                              id: warehouse.length + 1,
                              ...newWarehouseItem
                            }]);
                            setNewWarehouseItem({ name: '', quantity: 0, category: '' });
                            setIsAddWarehouseOpen(false);
                          }
                        }} 
                        className="w-full"
                      >
                        Добавить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {warehouse.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Количество: <span className="font-medium">{item.quantity} шт.</span>
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}

          {/* Lamps Tab */}
          {currentUser === 'admin' && (
            <TabsContent value="lamps" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Учёт ламп</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive" className="animate-pulse">
                    <Icon name="AlertTriangle" size={14} />
                    {lamps.filter(lamp => (lamp.maxHours - lamp.workingHours) <= 48).length} требуют замены
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4">
                {lamps.map((lamp) => {
                  const remainingHours = lamp.maxHours - lamp.workingHours;
                  const needsReplacement = remainingHours <= 48;
                  
                  return (
                    <Card key={lamp.id} className={needsReplacement ? 'border-red-500' : ''}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">Зал {lamp.hallId}</h3>
                              {needsReplacement && (
                                <Badge variant="destructive">Требует замены</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{lamp.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Установлена: {new Date(lamp.installDate).toLocaleDateString('ru-RU')}
                            </p>
                            <div className="text-sm">
                              <span className={needsReplacement ? 'text-red-500 font-semibold' : 'text-muted-foreground'}>
                                Осталось: {remainingHours} часов
                              </span>
                              <span className="text-muted-foreground ml-2">
                                ({lamp.workingHours}/{lamp.maxHours} ч.)
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Icon name="RotateCcw" size={14} />
                              Заменить
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;