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
          <TabsList className="grid w-full grid-cols-3 mb-8">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button 
                        variant={halls.find(h => h.id === selectedHall)?.sessionActive ? "destructive" : "default"}
                        onClick={() => toggleSession(selectedHall)}
                        className="h-16"
                      >
                        <Icon name="Play" size={20} />
                        {halls.find(h => h.id === selectedHall)?.sessionActive ? 'Выключить сеанс' : 'Включить сеанс'}
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
                  <Button variant="outline" disabled>
                    <Icon name="Users" size={16} />
                    Управление пользователями
                  </Button>
                  <Button variant="outline" disabled>
                    <Icon name="Package" size={16} />
                    Склад
                  </Button>
                  <Button variant="outline" disabled>
                    <Icon name="Lightbulb" size={16} />
                    Учёт ламп
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;