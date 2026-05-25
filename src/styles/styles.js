import { StyleSheet, Platform } from 'react-native';

// Paleta de cores moderna (Slate & Indigo)
const colors = {
  background: '#F8FAFC', // Cinza muito claro para o fundo
  surface: '#FFFFFF',    // Branco para os cards e inputs
  primary: '#4F46E5',    // Indigo (Cor principal)
  textDark: '#1E293B',   // Quase preto para títulos
  textMuted: '#64748B',  // Cinza médio para datas e textos secundários
  border: '#E2E8F0',     // Cinza claro para bordas
  success: '#10B981',    // Verde Emerald para os valores
};

export const styles = StyleSheet.create({
  // ==========================================
  // ESTRUTURA GERAL
  // ==========================================
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // ==========================================
  // DASHBOARD DE RESUMO (TELA INICIAL)
  // ==========================================
  summaryCard: {
    backgroundColor: colors.primary,
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 8 },
      android: { elevation: 6 },
      web: { boxShadow: '0px 6px 12px rgba(79, 70, 229, 0.3)' }
    })
  },
  summaryLabel: { 
    color: 'rgba(255, 255, 255, 0.8)', 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 4, 
    textTransform: 'uppercase', 
    letterSpacing: 1 
  },
  summaryValue: { 
    color: colors.surface, 
    fontSize: 36, 
    fontWeight: '900' 
  },

  // ==========================================
  // CARDS DE LISTAGEM DE GASTOS
  // ==========================================
  card: { 
    backgroundColor: colors.surface, 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 16, 
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 2 },
      web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.05)' }
    })
  },
  cardRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  cardIcon: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    backgroundColor: '#EEF2FF', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 16 
  },
  cardDetails: { 
    flex: 1 
  },
  cardValueContainer: { 
    alignItems: 'flex-end' 
  },
  title: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: colors.textDark, 
    marginBottom: 4 
  },
  badge: { 
    backgroundColor: '#EEF2FF', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6, 
    color: colors.primary, 
    fontSize: 12, 
    fontWeight: '700', 
    overflow: 'hidden' 
  },
  date: { 
    fontSize: 13, 
    color: colors.textMuted, 
    fontWeight: '500' 
  },
  value: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: colors.success 
  },

  // ==========================================
  // FORMULÁRIOS E INPUTS
  // ==========================================
  input: { 
    backgroundColor: colors.surface, 
    borderWidth: 1.5, 
    borderColor: colors.border, 
    borderRadius: 10, 
    paddingHorizontal: 16,
    paddingVertical: 14, 
    marginBottom: 16, 
    fontSize: 15,
    color: colors.textDark,
  },
  
  // ==========================================
  // BOTÕES E AÇÕES
  // ==========================================
  button: { 
    backgroundColor: colors.primary, 
    paddingVertical: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 12,
    ...Platform.select({
      ios: { shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
      android: { elevation: 4 },
      web: { boxShadow: '0px 4px 8px rgba(79, 70, 229, 0.2)' }
    })
  },
  buttonText: { 
    color: colors.surface, 
    fontSize: 16, 
    fontWeight: '700', 
    letterSpacing: 0.5 
  },
  
  // ==========================================
  // TEXTOS UTILITÁRIOS
  // ==========================================
  emptyText: { 
    textAlign: 'center', 
    color: colors.textMuted, 
    marginTop: 16, 
    fontSize: 15, 
    fontWeight: '500' 
  }
});