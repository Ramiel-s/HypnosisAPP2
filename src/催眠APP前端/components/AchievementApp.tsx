import React, { useEffect, useRef, useState } from 'react';
import { UserResources, Achievement } from '../types';
import { DataService } from '../services/dataService';
import {
  Trophy,
  Scroll,
  ArrowLeft,
  CheckCircle,
  Lock,
  Gift,
  Hourglass,
  Star,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

interface AchievementAppProps {
  userData: UserResources;
  onUpdateUser: (data: UserResources) => void;
  onBack: () => void;
}

export const AchievementApp: React.FC<AchievementAppProps> = ({ userData, onUpdateUser, onBack }) => {
  const [activeTab, setActiveTab] = useState<'ACHIEVEMENTS' | 'QUESTS'>('ACHIEVEMENTS');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = useRef<number | null>(null);

  const refreshAchievements = async () => {
    try {
      const achData = await DataService.getAchievements();
      setAchievements(achData);
    } catch (err) {
      console.warn('[HypnoOS] 成就刷新失败', err);
    } finally {
      setLoading(false);
    }
  };

  const requestRefresh = () => {
    if (refreshTimerRef.current !== null) return;
    refreshTimerRef.current = window.setTimeout(() => {
      refreshTimerRef.current = null;
      void refreshAchievements();
    }, 100);
  };

  useEffect(() => {
    if (activeTab !== 'ACHIEVEMENTS') return;
    let stopped = false;

    requestRefresh();

    let stops: Array<{ stop: () => void }> = [];
    void (async () => {
      try {
        await waitGlobalInitialized('Mvu');
        if (stopped) return;
        stops = [
          eventOn(Mvu.events.VARIABLE_INITIALIZED, requestRefresh),
          eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, requestRefresh),
        ];
      } catch {
        // ignore: not in tavern env
      }
    })();

    return () => {
      stopped = true;
      if (refreshTimerRef.current !== null) {
        window.clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      stops.forEach(s => s.stop());
    };
  }, [activeTab]);

  // --- Handlers ---

  const handleClaimAchievement = async (ach: Achievement) => {
    if (ach.isClaimed) return;
    // Client-side validation using passed userData
    if (!ach.checkCondition(userData)) return;

    const result = await DataService.claimAchievement(ach.id, userData.mcPoints);
    if (result.success) {
      onUpdateUser({ ...userData, mcPoints: result.newPoints });
      setAchievements(prev => prev.map(a => (a.id === ach.id ? { ...a, isClaimed: true } : a)));
    }
  };

  // Helper: Sort Achievements (Unlocked & Unclaimed -> Locked -> Claimed)
  const sortedAchievements = [...achievements].sort((a, b) => {
    const aUnlocked = a.checkCondition(userData);
    const bUnlocked = b.checkCondition(userData);

    // 1. Unlocked but Unclaimed first
    if (aUnlocked && !a.isClaimed && (!bUnlocked || b.isClaimed)) return -1;
    if (bUnlocked && !b.isClaimed && (!aUnlocked || a.isClaimed)) return 1;

    // 2. Locked second
    if (!aUnlocked && !a.isClaimed && b.isClaimed) return -1;
    if (!bUnlocked && !b.isClaimed && a.isClaimed) return 1;

    return 0;
  });

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white animate-fade-in relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header */}
      <div className="px-4 py-4 pt-6 flex items-center justify-between z-10 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft className="text-gray-300" size={20} />
          </button>
          <h1 className="text-lg font-bold tracking-wide">成就中心</h1>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-amber-100">{userData.mcPoints}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-4 gap-4 z-10">
        <button
          onClick={() => setActiveTab('ACHIEVEMENTS')}
          className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2
            ${
              activeTab === 'ACHIEVEMENTS'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
        >
          <Trophy size={16} /> 成就列表
        </button>
        <button
          onClick={() => setActiveTab('QUESTS')}
          className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2
            ${
              activeTab === 'QUESTS'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
        >
          <Scroll size={16} /> 悬赏任务{' '}
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">WIP</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-4 no-scrollbar z-10">
        {loading && <div className="text-center text-gray-500 py-10">Loading data...</div>}

        {/* --- ACHIEVEMENTS LIST --- */}
        {!loading && activeTab === 'ACHIEVEMENTS' && (
          <div className="space-y-3">
            {sortedAchievements.map(ach => {
              const isUnlocked = ach.checkCondition(userData);
              return (
                <div
                  key={ach.id}
                  className={`
                    relative p-4 rounded-2xl border transition-all duration-300
                    ${
                      ach.isClaimed
                        ? 'bg-slate-800/50 border-white/5 opacity-60'
                        : isUnlocked
                          ? 'bg-indigo-900/20 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                          : 'bg-slate-800/30 border-white/5'
                    }
                 `}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-indigo-500/20' : 'bg-gray-700/30'}`}>
                        {ach.isClaimed ? (
                          <CheckCircle size={20} className="text-gray-400" />
                        ) : isUnlocked ? (
                          <Trophy size={20} className="text-indigo-400" />
                        ) : (
                          <Lock size={20} className="text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                          {ach.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 pr-4">{ach.description}</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    {ach.isClaimed ? (
                      <span className="text-xs font-medium text-gray-500 py-1 px-2">已领取</span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => handleClaimAchievement(ach)}
                        className="bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg flex items-center gap-1 animate-pulse"
                      >
                        <Gift size={12} />领 {ach.rewardMcPoints} PT
                      </button>
                    ) : (
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-indigo-400/50">+{ach.rewardMcPoints} PT</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- QUESTS (WIP) --- */}
        {!loading && activeTab === 'QUESTS' && (
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Hourglass size={18} className="text-white/70" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold">任务系统施工中</div>
                <div className="text-xs text-white/60 mt-1 leading-relaxed">
                  悬赏任务模块暂时锁定为 WIP，后续会再开放。
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
