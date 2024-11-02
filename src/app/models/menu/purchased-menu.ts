export class PurchasedMenuGroup {
    menuGroupId!: string;
    menuGroupName!: string;
    icon!: string;
    bsTargetId!: string;
    expandIcon!: string;
    collapseIcon!: string;
    mainMenus!: PurchasedMainMenu[];
}

export class PurchasedMainMenu {
    mainMenuId!: string;
    mainMenuName!: string;
    icon!: string;
    routerLink!: string;
    bsTargetId!: string;
    expandIcon!: string;
    collapseIcon!: string;
    subMenus!: PurchasedSubMenu[];
}

export class PurchasedSubMenu {
    subMenuId!: string;
    subMenuName!: string;
    icon!: string;
    routerLink!: string;
}