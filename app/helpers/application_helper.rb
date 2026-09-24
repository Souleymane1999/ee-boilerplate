module ApplicationHelper
  def nav_link_classes(active)
    base = 'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm'
    if active
      "#{base} bg-brand-lime-100 font-semibold text-brand-lime-700"
    else
      "#{base} font-medium text-neutral-600 hover:bg-neutral-50"
    end
  end
end
