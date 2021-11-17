FactoryBot.define do
  factory :recipe do
    ingredients { %w[noodles chicken paprika] }
    name { "Chicken paprika noddles" }
  end
end
