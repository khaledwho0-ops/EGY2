"use client";

import { useState } from "react";
import { ChevronDown, Shield, Brain, AlertTriangle, Crosshair, BookOpen } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ENGINE_COMBAT_LENSES, type LayerCombat } from "@/data/engine-combat-lenses";
import { LAYERS, LAYER_COLORS } from "@/components/six-layers/data";

interface Props {
  engineId: "mental-health" | "deepreal" | "religion-hub";
}

const LAYER_ICONS = [AlertTriangle, Shield, BookOpen, Crosshair, Brain, Shield, AlertTriangle];

function CombatCard({ combat, layerData, accentColor, isRTL }: { combat: LayerCombat; layerData: any; accentColor: string; isRTL: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const layerColor = (LAYER_COLORS as any)[combat.layerNumber]?.accent || accentColor;

  return (
    <div
      className="relative overflow-hidden transition-all duration-500"
      style={{
        border: `1px solid ${isOpen ? layerColor : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 16,
        background: isOpen
          ? `linear-gradient(135deg, ${layerColor}08, ${layerColor}03)`
          : 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Header — Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        {/* Layer Number Badge */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono text-lg font-black"
          style={{ background: `${layerColor}20`, color: layerColor }}
        >
          {combat.layerNumber}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{ background: `${layerColor}15`, color: layerColor }}
            >
              {isRTL ? combat.methodologyTagAr : combat.methodologyTagEn}
            </span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-white truncate">
            {isRTL ? combat.weaponNameAr : combat.weaponNameEn}
          </h3>
          <p className="text-xs text-white/40 mt-0.5 truncate">
            vs. {isRTL ? layerData?.nameAr : layerData?.name}
          </p>
        </div>

        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div
          className="px-5 md:px-6 pb-6 space-y-6 animate-[fadeIn_0.3s_ease]"
          style={{ direction: isRTL ? "rtl" : "ltr" }}
        >
          {/* Layer Definition */}
          <div className="p-4 rounded-xl bg-black/30 border-l-4" style={{ borderColor: layerColor }}>
            <h4 className="text-sm font-mono uppercase tracking-wider mb-2" style={{ color: layerColor }}>
              {isRTL ? `الطبقة ${layerData?.numberAr}: ${layerData?.nameAr}` : `Layer ${combat.layerNumber}: ${layerData?.name}`}
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              {isRTL ? layerData?.definitionAr : layerData?.definition}
            </p>
          </div>

          {/* The Deep Cognitive Protocol */}
          <div>
            <h4 className="text-sm font-bold text-white/80 mb-3 flex items-center gap-2">
              <Brain size={14} style={{ color: accentColor }} />
              {isRTL ? "البروتوكول المعرفي" : "Cognitive Protocol"}
            </h4>
            <div className="text-sm text-white/70 leading-[1.9] whitespace-pre-line">
              {isRTL ? combat.cognitiveProtocolAr : combat.cognitiveProtocolEn}
            </div>
          </div>

          {/* The Rewrite Rule */}
          <div
            className="p-4 rounded-xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
              border: `1px solid ${accentColor}30`,
            }}
          >
            <h4 className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: accentColor }}>
              {isRTL ? "القاعدة المعرفية المُعاد برمجتها" : "The Cognitive Rewrite Rule"}
            </h4>
            <p className="text-sm font-semibold leading-relaxed" style={{ color: accentColor }}>
              "{isRTL ? combat.rewriteRuleAr : combat.rewriteRuleEn}"
            </p>
          </div>

          {/* Egyptian Case Study IDs */}
          {combat.egyptianCaseIds.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                {isRTL ? "حالات مصرية مرتبطة" : "Linked Egyptian Cases"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {combat.egyptianCaseIds.map((id) => {
                  const cs = LAYERS.flatMap(l => l.caseStudies).find(c => c.id === id);
                  if (!cs) return null;
                  return (
                    <span
                      key={id}
                      className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10 hover:border-white/30 transition-colors cursor-default"
                      title={isRTL ? cs.illustrationAr : cs.illustrationEn}
                    >
                      {cs.egyptianSpecific && "🇪🇬 "}{isRTL ? cs.titleAr : cs.title} ({cs.year})
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function LayerCombatEngine({ engineId }: Props) {
  const { isRTL } = useRTL();
  const lens = ENGINE_COMBAT_LENSES[engineId];
  if (!lens) return null;

  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: "#070707" }}
    >
      <div className="container" style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-mono tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-6"
            style={{ background: `${lens.accentColor}15`, color: lens.accentColor }}
          >
            {isRTL ? "نظام القتال ضد ٧ طبقات" : "7-Layer Combat System"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {isRTL ? "كيف يحارب هذا المحرك كل طبقة" : "How This Engine Fights Every Layer"}
          </h2>
          <p className="text-lg text-white/50 max-w-3xl mx-auto leading-relaxed">
            {isRTL
              ? "كل طبقة من طبقات التضليل السبع لها سلاح معرفي مخصص. لا توجد طبقة تنجو. لا يوجد ادعاء يمر بدون تشريح."
              : "Every single layer of the 7-layer deception architecture has a dedicated cognitive weapon. No layer survives. No claim passes without dissection."}
          </p>
        </div>

        {/* Combat Cards */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {lens.layers.map((combat) => {
            const layerData = LAYERS.find(l => l.number === combat.layerNumber);
            return (
              <CombatCard
                key={combat.layerNumber}
                combat={combat}
                layerData={layerData}
                accentColor={lens.accentColor}
                isRTL={isRTL}
              />
            );
          })}
        </div>
      </div>

      {/* Inline animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
}
