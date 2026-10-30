const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumerals(num: number | string): string {
  const str = num.toString();
  return str.replace(/\d/g, (d) => BENGALI_DIGITS[parseInt(d, 10)]);
}

export function formatBDT(amount: number, useBengali = true): string {
  const rounded = Math.round(amount);
  const formattedStandard = new Intl.NumberFormat('en-IN').format(rounded);
  
  if (useBengali) {
    return `৳ ${toBengaliNumerals(formattedStandard)}`;
  }
  return `৳ ${formattedStandard}`;
}

export function formatOrderDate(dateString: string, useBengali = true): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    if (useBengali) {
      return d.toLocaleDateString('bn-BD', options);
    }
    return d.toLocaleDateString('en-GB', options);
  } catch {
    return dateString;
  }
}

export function getOrderStatusBadge(status: string, useBengali = true): { label: string; color: string; bg: string } {
  switch (status) {
    case 'pending':
      return {
        label: useBengali ? 'অপেক্ষমান (Pending)' : 'Pending',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30'
      };
    case 'confirmed':
      return {
        label: useBengali ? 'নিশ্চিত করা হয়েছে (Confirmed)' : 'Confirmed',
        color: 'text-sky-400',
        bg: 'bg-sky-500/10 border-sky-500/30'
      };
    case 'processing':
      return {
        label: useBengali ? 'প্রসেসিং হচ্ছে (Packaging)' : 'Packaging',
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10 border-indigo-500/30'
      };
    case 'shipped':
      return {
        label: useBengali ? 'ডেলিভারিতে বের হয়েছে (Shipped)' : 'Shipped',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10 border-purple-500/30'
      };
    case 'delivered':
      return {
        label: useBengali ? 'সম্পন্ন / ডেলিভার্ড (Delivered)' : 'Delivered',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30'
      };
    case 'cancelled':
      return {
        label: useBengali ? 'বাতিল করা হয়েছে (Cancelled)' : 'Cancelled',
        color: 'text-rose-400',
        bg: 'bg-rose-500/10 border-rose-500/30'
      };
    default:
      return {
        label: status,
        color: 'text-zinc-400',
        bg: 'bg-zinc-800 border-zinc-700'
      };
  }
}
