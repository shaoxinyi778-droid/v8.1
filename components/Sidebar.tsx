import React, { useRef } from 'react';
import { FilterFolder, Project } from '../types';
import { formatBytes } from '../utils/db';
import { supabase } from '../lib/supabaseClient';

interface SidebarProps {
  currentFolder: FilterFolder;
  onFilterChange: (folder: FilterFolder) => void;
  onUploadClick: () => void;
  projects: Project[];
  onCreateProject: () => void;
  onDeleteProject: (id: number, e: React.MouseEvent) => void;
  userEmail?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentFolder, 
  onFilterChange, 
  onUploadClick,
  projects,
  onCreateProject,
  onDeleteProject,
  userEmail
}) => {
  const getNavItemClass = (folder: FilterFolder) => {
    const baseClass = "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer";
    if (currentFolder === folder) {
      return `${baseClass} bg-indigo-50 text-indigo-700`;
    }
    return `${baseClass} text-gray-600 hover:bg-gray-50 hover:text-gray-900`;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-full shadow-sm z-10">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white mr-3">
          <i className="fa-solid fa-bolt"></i>
        </div>
        <span className="text-lg font-bold text-gray-800 tracking-tight">智能素材库</span>
      </div>

      {/* Upload Button */}
      <div className="p-6 pb-2">
        <button 
          onClick={onUploadClick}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
        >
          <i className="fa-solid fa-cloud-arrow-up group-hover:-translate-y-1 transition-transform"></i>
          {userEmail ? '上传视频' : '添加本地视频'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        
        {/* Overview */}
        <div>
          <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">素材库概览</h3>
          <ul className="space-y-1">
            <li>
              <a onClick={() => onFilterChange('all')} className={getNavItemClass('all')}>
                <i className="fa-regular fa-folder-open w-6 text-center mr-2"></i> 全部素材
              </a>
            </li>
            <li>
              <a onClick={() => onFilterChange('fav')} className={getNavItemClass('fav')}>
                <i className="fa-regular fa-heart w-6 text-center mr-2"></i> 收藏夹
              </a>
            </li>
            <li>
              <a onClick={() => onFilterChange('trash')} className={getNavItemClass('trash')}>
                <i className="fa-regular fa-trash-can w-6 text-center mr-2"></i> 回收站
              </a>
            </li>
          </ul>
        </div>

        {/* Smart Folders */}
        <div>
          <h3 className="px-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            智能文件夹 (AI)
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </h3>
          <ul className="space-y-1">
            <li>
              <a onClick={() => onFilterChange('v-human')} className={getNavItemClass('v-human')}>
                <i className="fa-solid fa-mobile-screen w-6 text-center mr-2 text-gray-400"></i> 竖屏 - 有人像
              </a>
            </li>
            <li>
              <a onClick={() => onFilterChange('v-scenery')} className={getNavItemClass('v-scenery')}>
                <i className="fa-solid fa-mobile-screen w-6 text-center mr-2 text-gray-400"></i> 竖屏 - 空镜
              </a>
            </li>
            <li>
              <a onClick={() => onFilterChange('h-human')} className={getNavItemClass('h-human')}>
                <i className="fa-solid fa-display w-6 text-center mr-2 text-gray-400"></i> 横屏 - 有人像
              </a>
            </li>
            <li>
              <a onClick={() => onFilterChange('h-scenery')} className={getNavItemClass('h-scenery')}>
                <i className="fa-solid fa-display w-6 text-center mr-2 text-gray-400"></i> 横屏 - 空镜
              </a>
            </li>
          </ul>
        </div>

        {/* Custom Projects */}
        <div>
          <h3 
            className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex justify-between group cursor-pointer hover:text-indigo-600"
            onClick={onCreateProject}
            title="点击新建文件夹"
          >
            自定义项目
            <i className="fa-solid fa-plus"></i>
          </h3>
          <ul className="space-y-1">
            {projects.map(project => (
              <li key={project.id} className="group relative">
                <a 
                  onClick={() => onFilterChange(`project-${project.id}`)} 
                  className={getNavItemClass(`project-${project.id}`)}
                >
                  <i className="fa-regular fa-folder w-6 text-center mr-2 text-yellow-500"></i> 
                  <span className="truncate flex-1">{project.name}</span>
                </a>
                <button 
                  onClick={(e) => onDeleteProject(project.id, e)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                  title="删除项目"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </li>
            ))}
            {projects.length === 0 && (
                <li className="px-3 py-2 text-xs text-gray-400 italic">
                    暂无项目，点击上方 + 号新建
                </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${userEmail ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'}`}>
            {userEmail ? userEmail[0].toUpperCase() : <i className="fa-solid fa-user-secret"></i>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate" title={userEmail}>
                {userEmail || '访客模式'}
            </p>
            <p className={`text-xs flex items-center gap-1 ${userEmail ? 'text-green-600' : 'text-gray-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${userEmail ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {userEmail ? '已同步云端' : '本地暂存'}
            </p>
          </div>
          {userEmail && (
            <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 p-1"
                title="退出登录"
            >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};